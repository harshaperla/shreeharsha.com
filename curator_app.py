#!/usr/bin/env python3
"""
Taiwan Photo Curator & Post Manager - Internal Tool
Standalone, ultra-fast local web application for triaging, selecting, rejecting,
annotating, selecting by post, and setting featured cover photos.
Runs locally at: http://localhost:8765
"""

import http.server
import socket
import json
import os
import shutil
import threading
import urllib.parse
from pathlib import Path
try:
    from PIL import Image, ImageOps
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

PORT = 8765
BASE_DIR = Path('/Users/harshap/shreeharsha/taiwan-photos').resolve()
WEB_APP_DIR = Path('/Users/harshap/shreeharsha/shreeharsha.com').resolve()
SELECTIONS_FILE = BASE_DIR / 'CURATION_STATE.json'
STATE_LOCK = threading.Lock()

# Clean English metadata mapping prefix clusters to friendly post / destination names
POSTS_METADATA = {
    # Day 1
    "day1_00_transit_flight": {"name": "Flight & Arrival", "day": "day1", "placeId": "taoyuan-airport"},
    "day1_01_taoyuan_airport": {"name": "Taoyuan Airport & MRT", "day": "day1", "placeId": "taoyuan-airport"},
    "day1_02_taipei_main_station": {"name": "Taipei Main Station", "day": "day1", "placeId": "taipei-main-station"},
    "day1_03_ximending": {"name": "Ximending Youth District", "day": "day1", "placeId": "ximending"},
    "day1_04_longshan_temple": {"name": "Mengjia Longshan Temple", "day": "day1", "placeId": "longshan-temple"},
    "day1_05_guangzhou_night_market": {"name": "Guangzhou Street Night Market", "day": "day1", "placeId": "guangzhou-night-market"},

    # Day 2
    "day2_00_taipei_viahotel": {"name": "Taipei Morning Walk", "day": "day2", "placeId": "ximending"},
    "day2_01_jiufen_old_street": {"name": "Jiufen Old Street", "day": "day2", "placeId": "jiufen-old-street"},
    "day2_02_jiufen_qingyun_temple": {"name": "Jiufen Qingyun Temple", "day": "day2", "placeId": "jiufen-qingyun-temple"},
    "day2_02_transit_route303": {"name": "Ruifang Coastal Highway", "day": "day2", "placeId": "jiufen-qingyun-temple"},
    "day2_02_transit_to_badouzi": {"name": "Transit to Badouzi", "day": "day2", "placeId": "badouzi-trail"},
    "day2_03_badouzi_coastal_trail": {"name": "Badouzi Coastal Trail & Wangyou Valley", "day": "day2", "placeId": "badouzi-trail"},
    "day2_04_taipei_evening": {"name": "Taipei Evening Return", "day": "day2", "placeId": "ximending"},

    # Day 3
    "day3_00_transit_cards": {"name": "Transit & EasyCard", "day": "day3", "placeId": "xinyi-district"},
    "day3_01_mrt_commute_right_escalator": {"name": "MRT Escalator Commute", "day": "day3", "placeId": "xinyi-district"},
    "day3_02_taipei_101_exterior": {"name": "Taipei 101 Skyline & Exterior", "day": "day3", "placeId": "taipei-101"},
    "day3_03_taipei_101_observatory": {"name": "Taipei 101 Observatory (89F)", "day": "day3", "placeId": "taipei-101"},
    "day3_04_taipei_101_wind_damper": {"name": "Taipei 101 Tuned Mass Damper", "day": "day3", "placeId": "taipei-101"},
    "day3_05_xinyi_skybridge_district": {"name": "Xinyi Commercial District", "day": "day3", "placeId": "xinyi-district"},
    "day3_06_xiangti_avenue_plaza": {"name": "Xiangti Avenue Plaza", "day": "day3", "placeId": "xinyi-district"},

    # Day 4
    "day4_00_thsr_transit": {"name": "THSR 700T Bullet Train (300 km/h)", "day": "day4", "placeId": "thsr-bullet-train"},
    "day4_01_fo_guang_shan": {"name": "Fo Guang Shan Buddha Museum", "day": "day4", "placeId": "fo-guang-shan"},
    "day4_02_pier2_art_center": {"name": "Pier-2 Art Center & Harbor", "day": "day4", "placeId": "pier2-art-center"},
    "day4_03_cijin_island": {"name": "Cijin Island & Cihou Fort", "day": "day4", "placeId": "cijin-island"},
    "day4_04_kaohsiung_city": {"name": "Kaohsiung Harbor & Night View", "day": "day4", "placeId": "pier2-art-center"},

    # Day 5
    "day5_00_alishan_highway": {"name": "Alishan Highway Ascent", "day": "day5", "placeId": "alishan-forest-railway"},
    "day5_01_alishan_station": {"name": "Alishan Forest Railway & Station", "day": "day5", "placeId": "alishan-forest-railway"},
    "day5_02_giant_trees_trail": {"name": "Giant Tree Plank Trail", "day": "day5", "placeId": "alishan-giant-trees"},
    "day5_03_alishan_forest": {"name": "Alishan Sacred Cypress Forest", "day": "day5", "placeId": "alishan-giant-trees"},
    "day5_04_evening_transit": {"name": "Alishan Mountain Descent", "day": "day5", "placeId": "alishan-forest-railway"},

    # Day 6
    "day6_00_mountain_drive": {"name": "Yangmingshan Mountain Drive", "day": "day6", "placeId": "xiaoyoukeng-fumaroles"},
    "day6_01_xiaoyoukeng_fumaroles": {"name": "Xiaoyoukeng Sulfur Fumaroles", "day": "day6", "placeId": "xiaoyoukeng-fumaroles"},
    "day6_02_lengshuikeng_hotspring": {"name": "Lengshuikeng & Suspension Bridge", "day": "day6", "placeId": "lengshuikeng-hotspring"},
    "day6_03_qingtiangang_grassland": {"name": "Qingtiangang Grassland & Buffaloes", "day": "day6", "placeId": "qingtiangang-grassland"},
    "day6_04_shilin_evening": {"name": "Yangmingshan Evening Descent", "day": "day6", "placeId": "qingtiangang-grassland"},

    # Day 7
    "day7_00_jinshan_coast": {"name": "Jinshan Coastal Highway", "day": "day7", "placeId": "jinshan-coastal-highway"},
    "day7_01_thermal_valley": {"name": "Xinbeitou Thermal Valley", "day": "day7", "placeId": "beitou-thermal-valley"},
    "day7_02_sulfur_valley": {"name": "Beitou Sulfur Valley Geothermal Area", "day": "day7", "placeId": "beitou-sulfur-valley"},
    "day7_03_shilin_night_market": {"name": "Shilin Night Market", "day": "day7", "placeId": "shilin-night-market"},
    "day7_04_yongkang_street": {"name": "Yongkang Street Stroll", "day": "day7", "placeId": "shilin-night-market"},
}

def load_state():
    with STATE_LOCK:
        if SELECTIONS_FILE.exists():
            try:
                with open(SELECTIONS_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if 'selected' not in data: data['selected'] = {}
                    if 'rejected' not in data: data['rejected'] = {}
                    if 'captions' not in data: data['captions'] = {}
                    if 'featured' not in data: data['featured'] = {}
                    return data
            except Exception as e:
                print(f"[load_state error]: {e}")
        return {'selected': {}, 'rejected': {}, 'captions': {}, 'featured': {}}

def save_state(state):
    with STATE_LOCK:
        try:
            tmp_file = SELECTIONS_FILE.with_suffix('.tmp')
            with open(tmp_file, 'w', encoding='utf-8') as f:
                json.dump(state, f, indent=2, ensure_ascii=False)
            os.replace(tmp_file, SELECTIONS_FILE)
            return True
        except Exception as e:
            print(f"[save_state error]: {e}")
            return False

def get_post_info(filename, folder_rel):
    stem = Path(filename).stem
    post_id = stem.split('_photo_')[0].split('_video_')[0]
    if post_id in POSTS_METADATA:
        info = POSTS_METADATA[post_id]
        return post_id, info['name'], info['day'], info['placeId']
    clean_name = post_id.replace('_', ' ').title()
    day = folder_rel.split('/')[0]
    return post_id, clean_name, day, ''

def scan_catalog():
    days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
    day_folders = []
    posts_dict = {}

    for name in days:
        p = BASE_DIR / name
        if p.is_dir():
            files = [f.name for f in p.iterdir() if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']]
            day_folders.append({
                'id': name,
                'label': f'Day {name[3:]}',
                'path': name,
                'count': len(files)
            })

            for f in sorted(p.iterdir()):
                if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                    post_id, post_name, day, place_id = get_post_info(f.name, name)
                    if post_id not in posts_dict:
                        posts_dict[post_id] = {
                            'id': post_id,
                            'name': post_name,
                            'day': day,
                            'placeId': place_id,
                            'folder': name,
                            'count': 0,
                            'photos': 0,
                            'videos': 0
                        }
                    posts_dict[post_id]['count'] += 1
                    if f.suffix.lower() == '.mp4':
                        posts_dict[post_id]['videos'] += 1
                    else:
                        posts_dict[post_id]['photos'] += 1

    # Also include split subfolders if present
    for split_parent in ['day1-3', 'day4-7']:
        parent_p = BASE_DIR / split_parent
        if parent_p.is_dir():
            for sub in sorted(parent_p.iterdir()):
                if sub.is_dir() and not sub.name.startswith('.'):
                    rel = f'{split_parent}/{sub.name}'
                    files = [f.name for f in sub.iterdir() if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']]
                    day_folders.append({
                        'id': rel,
                        'label': f'{split_parent} -> {sub.name}',
                        'path': rel,
                        'count': len(files)
                    })

    posts_list = sorted(posts_dict.values(), key=lambda p: (p['day'], p['id']))
    return day_folders, posts_list

class CuratorHandler(http.server.SimpleHTTPRequestHandler):
    def do_HEAD(self):
        self.do_GET()

    def translate_path(self, path):
        clean_path = urllib.parse.unquote(path)
        if clean_path.startswith('/media/'):
            subpath = clean_path[len('/media/'):]
            return str(BASE_DIR / subpath)
        return super().translate_path(path)

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        if url.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(HTML_PAGE.encode('utf-8'))

        elif url.path == '/api/folders':
            day_folders, posts_list = scan_catalog()
            state = load_state()
            for p in posts_list:
                p_id = p['id']
                p['featured'] = state.get('featured', {}).get(p_id, None)
            self.send_json({
                'folders': day_folders,
                'posts': posts_list,
                'state': state
            })

        elif url.path == '/api/items':
            query = urllib.parse.parse_qs(url.query)
            folder_rel = query.get('folder', ['day1'])[0]
            post_filter = query.get('post', ['all'])[0]
            search_query = query.get('q', [''])[0].strip().lower()

            state = load_state()
            items = []

            scan_dirs = []
            if folder_rel == 'all':
                scan_dirs = [BASE_DIR / f'day{i}' for i in range(1, 8) if (BASE_DIR / f'day{i}').is_dir()]
            else:
                target_p = BASE_DIR / folder_rel
                if target_p.is_dir():
                    scan_dirs = [target_p]

            for folder_path in scan_dirs:
                curr_folder = folder_path.name
                for f in sorted(folder_path.iterdir()):
                    if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                        rel_path = str(f.relative_to(BASE_DIR))
                        is_video = f.suffix.lower() == '.mp4'
                        post_id, post_name, day, place_id = get_post_info(f.name, curr_folder)

                        if post_filter != 'all' and post_id != post_filter:
                            continue

                        is_featured = (state.get('featured', {}).get(post_id) == rel_path)

                        if search_query:
                            cap = state.get('captions', {}).get(rel_path, '').lower()
                            if search_query not in f.name.lower() and search_query not in post_name.lower() and search_query not in cap:
                                continue

                        items.append({
                            'id': rel_path,
                            'name': f.name,
                            'url': f'/media/{rel_path}',
                            'folder': curr_folder,
                            'isVideo': is_video,
                            'post': post_id,
                            'postName': post_name,
                            'isFeatured': is_featured,
                            'size': f.stat().st_size
                        })

            self.send_json({'folder': folder_rel, 'post': post_filter, 'items': items})

        elif self.path.startswith('/media/'):
            try:
                return super().do_GET()
            except (BrokenPipeError, ConnectionResetError):
                pass
        else:
            self.send_error(404)

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length) if length > 0 else b'{}'
        try:
            payload = json.loads(body.decode('utf-8'))
        except Exception:
            payload = {}

        if url.path == '/api/decide':
            item_id = payload.get('id')
            decision = payload.get('decision')
            state = load_state()
            if decision == 'selected':
                state['selected'][item_id] = True
                state['rejected'].pop(item_id, None)
            elif decision == 'rejected':
                state['rejected'][item_id] = True
                state['selected'].pop(item_id, None)
                for p_id, f_path in list(state.get('featured', {}).items()):
                    if f_path == item_id:
                        del state['featured'][p_id]
            else:
                state['selected'].pop(item_id, None)
                state['rejected'].pop(item_id, None)
            save_state(state)
            self.send_json({'success': True, 'state': state})

        elif url.path == '/api/feature':
            item_id = payload.get('id')
            post_id = payload.get('post')
            state = load_state()
            if 'featured' not in state:
                state['featured'] = {}

            current_featured = state['featured'].get(post_id)
            if current_featured == item_id:
                del state['featured'][post_id]
                is_now_featured = False
            else:
                state['featured'][post_id] = item_id
                state['selected'][item_id] = True
                state['rejected'].pop(item_id, None)
                is_now_featured = True

            save_state(state)
            self.send_json({'success': True, 'isFeatured': is_now_featured, 'featured': state['featured'], 'state': state})

        elif url.path == '/api/caption':
            item_id = payload.get('id')
            caption = payload.get('caption', '').strip()
            state = load_state()
            if 'captions' not in state:
                state['captions'] = {}
            if caption:
                state['captions'][item_id] = caption
            else:
                state['captions'].pop(item_id, None)
            save_state(state)
            self.send_json({'success': True, 'captions': state['captions']})

        elif url.path == '/api/post_action':
            post_id = payload.get('post')
            action = payload.get('action')
            folder = payload.get('folder', 'day1')
            state = load_state()

            affected = []
            target_dirs = [BASE_DIR / folder] if folder != 'all' else [BASE_DIR / f'day{i}' for i in range(1, 8)]
            for d in target_dirs:
                if d.is_dir():
                    for f in d.iterdir():
                        if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                            p_id, _, _, _ = get_post_info(f.name, d.name)
                            if p_id == post_id:
                                rel = str(f.relative_to(BASE_DIR))
                                affected.append(rel)

            if action == 'select_all':
                for rel in affected:
                    state['selected'][rel] = True
                    state['rejected'].pop(rel, None)
            elif action == 'reject_all':
                for rel in affected:
                    state['rejected'][rel] = True
                    state['selected'].pop(rel, None)
            elif action == 'reset':
                for rel in affected:
                    state['selected'].pop(rel, None)
                    state['rejected'].pop(rel, None)

            save_state(state)
            self.send_json({'success': True, 'affected': len(affected), 'state': state})

        elif url.path == '/api/export':
            state = load_state()
            target_dir = BASE_DIR / 'curated_selected'
            target_dir.mkdir(exist_ok=True)
            copied = 0
            captions_export = {}
            featured_export = state.get('featured', {})

            for item_id in state.get('selected', {}):
                src = BASE_DIR / item_id
                if src.exists():
                    dst_folder = target_dir / Path(item_id).parent
                    dst_folder.mkdir(parents=True, exist_ok=True)
                    dst = dst_folder / src.name
                    shutil.copy2(src, dst)
                    copied += 1
                    if item_id in state.get('captions', {}):
                        captions_export[item_id] = state['captions'][item_id]

            with open(target_dir / 'CURATED_CAPTIONS.json', 'w', encoding='utf-8') as f:
                json.dump(captions_export, f, indent=2, ensure_ascii=False)

            with open(target_dir / 'FEATURED_PHOTOS.json', 'w', encoding='utf-8') as f:
                json.dump(featured_export, f, indent=2, ensure_ascii=False)

            with open(target_dir / 'CURATED_SELECTIONS.md', 'w', encoding='utf-8') as f:
                f.write('# Curated Taiwan Photos & Featured Post Covers\n\n')
                f.write(f'Total selected files: {copied}\n')
                f.write(f'Total featured post covers: {len(featured_export)}\n\n')

                items_by_post = {}
                for item_id in sorted(state.get('selected', {}).keys()):
                    p_id, p_name, day, _ = get_post_info(Path(item_id).name, Path(item_id).parent.name)
                    if p_id not in items_by_post:
                        items_by_post[p_id] = {'name': p_name, 'day': day, 'items': []}
                    items_by_post[p_id]['items'].append(item_id)

                for p_id, p_data in sorted(items_by_post.items()):
                    feat_cover = featured_export.get(p_id)
                    f.write(f'## {p_data["name"]}\n')
                    f.write(f'- **Day**: {p_data["day"].upper()}\n')
                    if feat_cover:
                        f.write(f'- **Featured Cover**: `{feat_cover}`\n')
                    f.write(f'- **Selected Photos ({len(p_data["items"])})**:\n')
                    for it in p_data['items']:
                        cap = state.get('captions', {}).get(it, '')
                        is_cov = ' [FEATURED COVER]' if it == feat_cover else ''
                        if cap:
                            f.write(f'  - `{it}`{is_cov}: "{cap}"\n')
                        else:
                            f.write(f'  - `{it}`{is_cov}\n')
                    f.write('\n')

            self.send_json({'success': True, 'copied': copied, 'featured': len(featured_export), 'target': str(target_dir)})

        elif url.path == '/api/sync_website':
            state = load_state()
            featured = state.get('featured', {})
            synced = 0
            details = []
            public_taiwan = WEB_APP_DIR / 'public' / 'taiwan'
            public_taiwan.mkdir(parents=True, exist_ok=True)

            for post_id, photo_rel in featured.items():
                if post_id in POSTS_METADATA:
                    place_id = POSTS_METADATA[post_id].get('placeId')
                    src_file = BASE_DIR / photo_rel
                    if src_file.exists() and src_file.suffix.lower() in ['.jpg', '.jpeg', '.png']:
                        try:
                            dst_filename = f'cover-{place_id}.jpg' if place_id else f'cover-{post_id}.jpg'
                            dst_file = public_taiwan / dst_filename
                            if HAS_PIL:
                                with Image.open(src_file) as im:
                                    im = ImageOps.exif_transpose(im)
                                    w, h = im.size
                                    max_dim = 1920
                                    if max(w, h) > max_dim:
                                        if w > h:
                                            new_w = max_dim
                                            new_h = int(h * (max_dim / w))
                                        else:
                                            new_h = max_dim
                                            new_w = int(w * (max_dim / h))
                                        im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
                                    im.save(dst_file, 'JPEG', quality=85, optimize=True)
                            else:
                                shutil.copy2(src_file, dst_file)
                            synced += 1
                            details.append(f'{post_id} -> {dst_filename}')
                        except Exception:
                            pass

            self.send_json({'success': True, 'synced': synced, 'details': details})

        else:
            self.send_error(404)

    def send_json(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

HTML_PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taiwan Photo Curator (Internal)</title>
  <style>
    :root {
      --bg: #09090b;
      --card-bg: #18181b;
      --card-border: #27272a;
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --accent: #f59e0b;
      --accent-glow: rgba(245, 158, 11, 0.25);
      --success: #10b981;
      --danger: #ef4444;
      --sidebar-w: 280px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }
    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(24, 24, 27, 0.5); }
    ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 9999px; }

    /* Top Navigation */
    header {
      background: #121215;
      border-bottom: 1px solid #27272a;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      z-index: 30;
    }
    .header-brand { display: flex; align-items: center; gap: 10px; }
    .brand-icon {
      width: 34px; height: 34px; border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #10b981);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: bold; color: #000;
    }
    .brand-title { font-size: 15px; font-weight: 700; color: #fff; }
    .brand-tag {
      font-size: 10px; font-family: monospace; background: rgba(245, 158, 11, 0.15);
      color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 2px 7px; border-radius: 999px; margin-left: 6px;
    }
    .brand-subtitle { font-size: 11px; color: #71717a; font-family: monospace; }

    .header-actions { display: flex; align-items: center; gap: 12px; }
    .search-input {
      background: #18181b; border: 1px solid #27272a; border-radius: 8px;
      padding: 6px 12px; color: #fff; font-size: 12px; width: 200px;
      outline: none; transition: border-color 0.15s;
    }
    .search-input:focus { border-color: var(--accent); }
    .counter-badge {
      display: flex; align-items: center; gap: 8px; font-family: monospace;
      font-size: 11px; background: #18181b; border: 1px solid #27272a;
      padding: 5px 12px; border-radius: 8px;
    }
    .counter-badge .counter-btn {
      cursor: pointer; padding: 2px 5px; border-radius: 4px; transition: all 0.15s;
    }
    .counter-badge .counter-btn:hover {
      background: rgba(255,255,255,0.1); text-decoration: underline;
    }
    #save-status {
      font-size: 10px; font-family: monospace; font-weight: 700;
      padding: 3px 8px; border-radius: 6px; opacity: 0;
      transition: opacity 0.25s; display: none;
    }
    .btn {
      font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 8px;
      border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s;
    }
    .btn-export {
      background: linear-gradient(135deg, #f59e0b, #10b981); color: #000;
    }
    .btn-export:hover { opacity: 0.9; }
    .btn-sync {
      background: #18181b; border: 1px solid #3f3f46; color: #fbbf24;
    }
    .btn-sync:hover { background: #27272a; }

    /* Layout */
    .app-body { display: flex; flex: 1; overflow: hidden; }
    aside {
      width: var(--sidebar-w); background: #0e0e11; border-right: 1px solid #27272a;
      display: flex; flex-direction: column; justify-content: space-between;
      overflow-y: auto; flex-shrink: 0;
    }
    .sidebar-section { padding: 14px; border-bottom: 1px solid #1f1f23; }
    .sidebar-title {
      font-size: 10px; font-family: monospace; font-weight: 700; color: #71717a;
      text-transform: uppercase; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;
    }
    .sidebar-link-btn {
      background: none; border: none; font-size: 10px; color: #71717a;
      cursor: pointer; text-decoration: underline;
    }
    .sidebar-link-btn:hover { color: var(--accent); }

    /* Day Grid */
    .day-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
    .day-btn {
      background: #18181b; border: 1px solid #27272a; color: #a1a1aa;
      font-size: 11px; font-family: monospace; font-weight: 700;
      padding: 7px 0; border-radius: 6px; cursor: pointer; text-align: center;
      transition: all 0.15s;
    }
    .day-btn:hover { color: #fff; border-color: #3f3f46; }
    .day-btn.active {
      background: var(--accent); color: #000; border-color: var(--accent);
    }

    /* Post list */
    .post-list { max-height: 38vh; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
    .post-item-btn {
      background: transparent; border: 1px solid transparent; border-radius: 6px;
      padding: 6px 8px; text-align: left; font-size: 12px; color: #a1a1aa;
      cursor: pointer; display: flex; justify-content: space-between; align-items: center;
      transition: all 0.15s; width: 100%;
    }
    .post-item-btn:hover { background: #18181b; color: #fff; }
    .post-item-btn.active {
      background: rgba(245, 158, 11, 0.12); color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3); font-weight: 700;
    }
    .post-item-name {
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      display: flex; align-items: center; gap: 6px;
    }
    .post-item-count {
      font-size: 9px; font-family: monospace; background: #27272a;
      padding: 2px 6px; border-radius: 4px; color: #a1a1aa; flex-shrink: 0;
    }

    /* Filter buttons */
    .filter-list { display: flex; flex-direction: column; gap: 3px; }
    .filter-btn {
      background: transparent; border: none; border-radius: 6px;
      padding: 6px 10px; font-size: 11px; color: #a1a1aa; cursor: pointer;
      display: flex; justify-content: space-between; align-items: center; text-align: left;
    }
    .filter-btn:hover { background: #18181b; color: #fff; }
    .filter-btn.active { background: #27272a; color: #fff; font-weight: 700; }

    /* Shortcuts panel */
    .shortcuts-panel {
      padding: 12px 14px; background: #09090b; border-top: 1px solid #1f1f23;
      font-size: 10px; font-family: monospace; color: #71717a;
    }
    .shortcuts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 6px; }
    kbd {
      background: #27272a; padding: 2px 5px; border-radius: 4px; color: #fff; font-weight: bold;
    }

    /* Main Content */
    main {
      flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column;
    }
    .post-hero {
      background: #141417; border: 1px solid #27272a; border-radius: 14px;
      padding: 16px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;
    }
    .post-hero-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .post-hero-crumbs { font-size: 11px; font-family: monospace; color: #71717a; margin-bottom: 4px; }
    .post-hero-crumbs span { color: var(--accent); }
    .post-hero-desc { font-size: 12px; color: #a1a1aa; font-family: monospace; }

    .post-hero-right { display: flex; align-items: center; gap: 12px; }
    .featured-indicator {
      background: #09090b; border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 8px 14px; border-radius: 10px; font-size: 11px; font-family: monospace;
    }
    .featured-indicator b { color: #fbbf24; }
    .post-action-btn {
      background: #1f1f23; border: 1px solid #3f3f46; color: #f4f4f5;
      padding: 7px 12px; border-radius: 8px; font-size: 11px; font-weight: 700;
      cursor: pointer; transition: all 0.15s; font-family: monospace;
    }
    .post-action-btn:hover { background: #27272a; border-color: #71717a; }
    .post-action-btn.select-all {
      background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.35);
    }
    .post-action-btn.select-all:hover { background: #10b981; color: #000; }

    /* Gallery Grid */
    .gallery-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .photo-card {
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;
      justify-content: space-between; transition: all 0.2s; position: relative;
    }
    .photo-card:hover { border-color: #3f3f46; }
    .photo-card.is-featured {
      border-color: #fbbf24; box-shadow: 0 0 16px var(--accent-glow);
    }
    .photo-card.is-selected:not(.is-featured) {
      border-color: var(--success); box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
    }
    .photo-card.is-rejected { opacity: 0.35; }

    .thumb-wrap {
      position: relative; aspect-ratio: 16/10; background: #000;
      cursor: pointer; overflow: hidden;
    }
    .thumb-wrap img, .thumb-wrap video {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.2s;
    }
    .thumb-wrap:hover img { transform: scale(1.03); }
    .video-play-icon {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.35); color: #fff; font-size: 28px;
    }

    .badge-bar { position: absolute; top: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; }
    .badge {
      font-size: 9px; font-family: monospace; font-weight: 800; padding: 3px 7px;
      border-radius: 999px; text-transform: uppercase;
    }
    .badge-cover { background: #fbbf24; color: #000; }
    .badge-selected { background: #10b981; color: #000; }
    .badge-rejected { background: #ef4444; color: #fff; }
    .badge-caption { background: #38bdf8; color: #000; }

    .cover-toggle-btn {
      position: absolute; top: 8px; right: 8px; font-size: 10px; font-weight: 800;
      font-family: monospace; border: none; border-radius: 6px; padding: 4px 8px;
      cursor: pointer; background: rgba(0,0,0,0.7); color: #a1a1aa; backdrop-filter: blur(4px);
      transition: all 0.15s;
    }
    .cover-toggle-btn:hover { background: #000; color: #fbbf24; }
    .cover-toggle-btn.active {
      background: #fbbf24; color: #000;
    }

    .card-footer {
      padding: 10px 12px; background: #141417; border-top: 1px solid #27272a;
      display: flex; flex-direction: column; gap: 8px;
    }
    .card-meta { display: flex; justify-content: space-between; font-size: 10px; font-family: monospace; color: #71717a; }
    .card-meta span { color: #fbbf24; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .caption-input {
      width: 100%; background: #09090b; border: 1px solid #27272a; border-radius: 6px;
      padding: 5px 8px; color: #e4e4e7; font-size: 11px; outline: none;
    }
    .caption-input:focus { border-color: #fbbf24; }
    .card-decision-bar { display: flex; gap: 6px; }
    .decision-btn {
      flex: 1; padding: 6px 0; border-radius: 6px; border: none; font-size: 11px;
      font-weight: 700; font-family: monospace; cursor: pointer; text-align: center;
      transition: all 0.15s;
    }
    .decision-btn.select { background: #18181b; color: #a1a1aa; }
    .decision-btn.select:hover { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .decision-btn.select.active { background: #10b981; color: #000; }

    .decision-btn.reject { background: #18181b; color: #a1a1aa; }
    .decision-btn.reject:hover { background: rgba(239, 68, 68, 0.15); color: #f87171; }
    .decision-btn.reject.active { background: #ef4444; color: #fff; }

    /* Lightbox Modal */
    #lightbox-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.96); backdrop-filter: blur(10px);
      z-index: 100; display: none; flex-direction: column; justify-content: space-between;
      padding: 16px 24px;
    }
    #lightbox-modal.open { display: flex; }
    .lightbox-header {
      display: flex; justify-content: space-between; align-items: center; color: #fff;
      font-family: monospace; font-size: 12px;
    }
    .lightbox-media {
      flex: 1; display: flex; align-items: center; justify-content: center; position: relative;
    }
    .lightbox-media img, .lightbox-media video {
      max-height: 68vh; max-width: 88vw; object-fit: contain; border-radius: 8px;
    }
    .lightbox-nav-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(24,24,27,0.8); border: 1px solid #3f3f46; color: #fff;
      font-size: 20px; width: 44px; height: 44px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .lightbox-nav-btn.prev { left: 20px; }
    .lightbox-nav-btn.next { right: 20px; }
    .lightbox-nav-btn:hover { background: #fbbf24; color: #000; border-color: #fbbf24; }

    .lightbox-bottom {
      max-width: 760px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 10px;
    }
    .lightbox-caption-row {
      display: flex; gap: 8px; background: #18181b; border: 1px solid #27272a;
      border-radius: 10px; padding: 6px 12px; align-items: center;
    }
    .lightbox-caption-input {
      flex: 1; background: transparent; border: none; color: #fff; font-size: 13px; outline: none;
    }
    .lightbox-controls { display: flex; justify-content: center; gap: 12px; }
    .lb-btn {
      font-size: 12px; font-weight: 700; font-family: monospace; padding: 10px 20px;
      border-radius: 10px; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;
    }
    .lb-btn.cover { background: #18181b; border: 1px solid #fbbf24; color: #fbbf24; }
    .lb-btn.cover.active { background: #fbbf24; color: #000; }
    .lb-btn.select { background: #10b981; color: #000; }
    .lb-btn.reject { background: #ef4444; color: #fff; }
    .lb-btn.reset { background: #27272a; color: #a1a1aa; }
  </style>
</head>
<body>

  <!-- Top Navigation Header -->
  <header>
    <div class="header-brand">
      <div class="brand-icon">📸</div>
      <div>
        <div class="brand-title">
          Taiwan Photo Curator <span class="brand-tag">Internal Review</span>
        </div>
        <div class="brand-subtitle">Organized by Day & Post • Set Featured Covers</div>
      </div>
    </div>

    <div class="header-actions">
      <input type="text" id="search-input" class="search-input" placeholder="Search files, posts, notes..." oninput="handleSearch(this.value)" />

      <div class="counter-badge">
        <span class="counter-btn" style="color:#fbbf24;" id="featured-counter" onclick="viewAllState('featured')" title="View all featured covers across the trip">★ 0 Covers</span>
        <span style="color:#3f3f46;">|</span>
        <span class="counter-btn" style="color:#10b981;" id="selected-counter" onclick="viewAllState('selected')" title="View all selected photos across the trip">✓ 0 Selected</span>
        <span style="color:#3f3f46;">|</span>
        <span class="counter-btn" style="color:#ef4444;" id="rejected-counter" onclick="viewAllState('rejected')" title="View all rejected photos">✕ 0 Rejected</span>
        <span style="color:#3f3f46;">|</span>
        <span class="counter-btn" style="color:#71717a;" id="total-counter" onclick="viewAllState('all')" title="View all photos">0 Total</span>
      </div>

      <span id="save-status">Saved ✓</span>

      <button onclick="syncToWebsite()" class="btn btn-sync" title="Sync chosen featured photos to website">
        🚀 Sync Covers
      </button>
      <button onclick="exportSelected()" class="btn btn-export">
        Export Curated →
      </button>
    </div>
  </header>

  <!-- App Body -->
  <div class="app-body">
    
    <!-- Sidebar -->
    <aside>
      <div>
        <!-- 1. Day Selector -->
        <div class="sidebar-section">
          <div class="sidebar-title">
            <span>1. Select Day</span>
            <button onclick="loadDay('all')" class="sidebar-link-btn">All Days</button>
          </div>
          <div class="day-grid" id="day-pill-list"></div>
        </div>

        <!-- 2. Post Selector -->
        <div class="sidebar-section">
          <div class="sidebar-title">
            <span>2. Posts in <b style="color:#fbbf24;" id="posts-sub-title">Day 1</b></span>
            <button onclick="selectPost('all')" id="post-all-btn" class="sidebar-link-btn">All Posts</button>
          </div>
          <div class="post-list" id="post-list"></div>
        </div>

        <!-- 3. Filter View -->
        <div class="sidebar-section" style="border-bottom:none;">
          <div class="sidebar-title"><span>3. View Mode</span></div>
          <div class="filter-list">
            <button onclick="setFilter('all')" id="filter-all" class="filter-btn active">
              <span>All Media in Post</span>
              <span id="filter-count-all" style="font-family:monospace;font-size:10px;">0</span>
            </button>
            <button onclick="setFilter('featured')" id="filter-featured" class="filter-btn" style="color:#fbbf24;">
              <span>★ Featured Covers Only</span>
              <span id="filter-count-featured" style="font-family:monospace;font-size:10px;background:rgba(245,158,11,0.2);padding:2px 5px;border-radius:4px;">0</span>
            </button>
            <button onclick="setFilter('selected')" id="filter-selected" class="filter-btn" style="color:#10b981;">
              <span>✓ Selected Only</span>
              <span id="filter-count-selected" style="font-family:monospace;font-size:10px;background:rgba(16,185,129,0.2);padding:2px 5px;border-radius:4px;">0</span>
            </button>
            <button onclick="setFilter('captioned')" id="filter-captioned" class="filter-btn" style="color:#38bdf8;">
              <span>💬 With Notes / Captions</span>
              <span id="filter-count-captioned" style="font-family:monospace;font-size:10px;">0</span>
            </button>
            <button onclick="setFilter('unreviewed')" id="filter-unreviewed" class="filter-btn">
              <span>⏳ Unreviewed Only</span>
              <span id="filter-count-unreviewed" style="font-family:monospace;font-size:10px;">0</span>
            </button>
            <button onclick="setFilter('rejected')" id="filter-rejected" class="filter-btn" style="color:#f87171;">
              <span>✕ Rejected Only</span>
              <span id="filter-count-rejected" style="font-family:monospace;font-size:10px;">0</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Shortcuts -->
      <div class="shortcuts-panel">
        <b style="color:#d4d4d8;">⚡ Quick Keys</b>
        <div class="shortcuts-grid">
          <div><kbd>F</kbd> Cover</div>
          <div><kbd>S</kbd> Select</div>
          <div><kbd>R</kbd> Reject</div>
          <div><kbd>C</kbd> Caption</div>
          <div><kbd>← / →</kbd> Nav</div>
          <div><kbd>Space</kbd> View</div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main>
      <!-- Post Hero Bar -->
      <div class="post-hero">
        <div>
          <div class="post-hero-crumbs">
            <span id="badge-day">DAY 1</span> › <span id="badge-post-category">POST</span>
          </div>
          <h2 class="post-hero-title" id="post-header-title">Ximending Youth District</h2>
          <div class="post-hero-desc" id="post-header-stats">Loading items...</div>
        </div>

        <div class="post-hero-right">
          <div class="featured-indicator" id="post-featured-display">
            <span>Featured Cover:</span> <b id="post-featured-name">None chosen</b>
          </div>
          <button onclick="postBulkAction('select_all')" class="post-action-btn select-all">
            ✓ Select All Post
          </button>
          <button onclick="postBulkAction('reject_all')" class="post-action-btn">
            ✕ Reject Rest
          </button>
          <button onclick="postBulkAction('reset')" class="post-action-btn">
            ↺ Reset
          </button>
        </div>
      </div>

      <!-- Photos Grid -->
      <div class="gallery-grid" id="photo-grid"></div>
    </main>

  </div>

  <!-- Lightbox Modal -->
  <div id="lightbox-modal" onclick="closeLightbox(event)">
    <div class="lightbox-header">
      <div style="display:flex;align-items:center;gap:12px;">
        <span id="lightbox-title">Photo Title</span>
        <span id="lightbox-badge-featured" class="badge badge-cover" style="display:none;">★ FEATURED COVER</span>
      </div>
      <div>
        <span style="color:#71717a;margin-right:12px;">ESC to close • F for Cover • S Select • R Reject</span>
        <button onclick="closeLightbox()" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer;">✕</button>
      </div>
    </div>

    <div class="lightbox-media" onclick="event.stopPropagation()">
      <img id="lightbox-img" src="" />
      <video id="lightbox-video" controls autoplay style="display:none;"></video>
      <button onclick="prevItem()" class="lightbox-nav-btn prev">←</button>
      <button onclick="nextItem()" class="lightbox-nav-btn next">→</button>
    </div>

    <div class="lightbox-bottom" onclick="event.stopPropagation()">
      <div class="lightbox-caption-row">
        <span>💬</span>
        <input type="text" id="lightbox-caption-input" class="lightbox-caption-input" placeholder="Type a story note / caption and press Enter..." onkeydown="handleCaptionKey(event)" />
        <button onclick="saveLightboxCaption()" class="btn btn-sync">Save Note</button>
      </div>

      <div class="lightbox-controls">
        <button onclick="toggleCurrentFeatured()" id="lightbox-btn-featured" class="lb-btn cover">
          ★ Set as Featured Cover (F)
        </button>
        <button onclick="decideCurrent('selected')" class="lb-btn select">
          ✓ Select (S)
        </button>
        <button onclick="decideCurrent('none')" class="lb-btn reset">
          Reset
        </button>
        <button onclick="decideCurrent('rejected')" class="lb-btn reject">
          ✕ Reject (R)
        </button>
      </div>
    </div>
  </div>

  <script>
    let folders = [];
    let posts = [];
    let state = { selected: {}, rejected: {}, captions: {}, featured: {} };
    let currentDay = localStorage.getItem('curator_day') || 'day1';
    let currentPost = localStorage.getItem('curator_post') || 'all';
    let currentFilter = localStorage.getItem('curator_filter') || 'all';
    let searchQuery = '';
    let currentItems = [];
    let activeIndex = 0;
    let saveStatusTimer = null;

    function showSaveIndicator(msg, isError = false) {
      const el = document.getElementById('save-status');
      if (!el) return;
      el.innerText = msg;
      el.style.display = 'inline-block';
      el.style.opacity = '1';
      if (isError) {
        el.style.color = '#ef4444';
        el.style.background = 'rgba(239, 68, 68, 0.2)';
        el.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      } else {
        el.style.color = '#10b981';
        el.style.background = 'rgba(16, 185, 129, 0.15)';
        el.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      }
      clearTimeout(saveStatusTimer);
      saveStatusTimer = setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => { if (el.style.opacity === '0') el.style.display = 'none'; }, 250);
      }, 2000);
    }

    function syncStorage() {
      localStorage.setItem('curator_day', currentDay);
      localStorage.setItem('curator_post', currentPost);
      localStorage.setItem('curator_filter', currentFilter);
      try {
        history.replaceState(null, '', `#${currentDay}/${currentPost}/${currentFilter}`);
      } catch (e) {}
    }

    async function init() {
      try {
        // Check URL hash first (#day/post/filter)
        if (location.hash && location.hash.length > 2) {
          const parts = location.hash.slice(1).split('/');
          if (parts[0]) currentDay = parts[0];
          if (parts[1]) currentPost = parts[1];
          if (parts[2]) currentFilter = parts[2];
        }

        const res = await fetch('/api/folders');
        const data = await res.json();
        folders = data.folders || [];
        posts = data.posts || [];
        state = data.state || { selected: {}, rejected: {}, captions: {}, featured: {} };
        if (!state.selected) state.selected = {};
        if (!state.rejected) state.rejected = {};
        if (!state.captions) state.captions = {};
        if (!state.featured) state.featured = {};

        renderDayPills();
        renderPostList();
        setFilter(currentFilter, false);
        await fetchItems();
        updateGlobalCounters();
      } catch (err) {
        console.error('Init failed:', err);
        document.getElementById('post-header-title').innerText = 'Error connecting to local server';
        document.getElementById('post-header-stats').innerText = String(err);
      }
    }

    function renderDayPills() {
      const container = document.getElementById('day-pill-list');
      const days = ['all', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
      container.innerHTML = days.map(d => {
        const label = d === 'all' ? 'ALL' : `D${d.replace('day', '')}`;
        const isActive = currentDay === d;
        return `<button onclick="loadDay('${d}')" class="day-btn ${isActive ? 'active' : ''}">${label}</button>`;
      }).join('');
    }

    function renderPostList() {
      const list = document.getElementById('post-list');
      const dayPosts = posts.filter(p => currentDay === 'all' || p.day === currentDay);
      document.getElementById('posts-sub-title').innerText = currentDay === 'all' ? 'All Days' : `Day ${currentDay.replace('day', '')}`;
      
      const allBtn = document.getElementById('post-all-btn');
      allBtn.style.color = currentPost === 'all' ? '#fbbf24' : '#71717a';

      if (dayPosts.length === 0) {
        list.innerHTML = '<div style="font-size:11px;color:#71717a;padding:8px 0;">No posts in this selection.</div>';
        return;
      }

      list.innerHTML = dayPosts.map(p => {
        const isSelected = currentPost === p.id;
        const hasCover = !!state.featured[p.id];
        return `
          <button onclick="selectPost('${p.id}')" class="post-item-btn ${isSelected ? 'active' : ''}">
            <span class="post-item-name">
              <span style="color:${hasCover ? '#fbbf24' : '#3f3f46'};font-size:12px;">★</span>
              <span>${p.name}</span>
            </span>
            <span class="post-item-count">${p.count}</span>
          </button>
        `;
      }).join('');
    }

    async function loadDay(day, keepPost = false) {
      currentDay = day;
      if (!keepPost) currentPost = 'all';
      syncStorage();
      renderDayPills();
      renderPostList();
      await fetchItems();
    }

    async function selectPost(postId) {
      currentPost = postId;
      syncStorage();
      renderPostList();
      await fetchItems();
    }

    async function viewAllState(filterName) {
      currentDay = 'all';
      currentPost = 'all';
      currentFilter = filterName;
      syncStorage();
      renderDayPills();
      renderPostList();
      setFilter(filterName, false);
      await fetchItems();
    }

    async function fetchItems() {
      const url = `/api/items?folder=${encodeURIComponent(currentDay)}&post=${encodeURIComponent(currentPost)}&q=${encodeURIComponent(searchQuery)}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        currentItems = data.items || [];
        updatePostHeaderInfo();
        renderGrid();
        updateFilterCounts();
      } catch (err) {
        console.error('Fetch items failed:', err);
      }
    }

    function updatePostHeaderInfo() {
      const dayBadge = document.getElementById('badge-day');
      const catBadge = document.getElementById('badge-post-category');
      const title = document.getElementById('post-header-title');
      const featuredName = document.getElementById('post-featured-name');
      const featuredBox = document.getElementById('post-featured-display');

      dayBadge.innerText = currentDay === 'all' ? 'ALL DAYS' : `DAY ${currentDay.replace('day', '')}`;

      if (currentPost === 'all') {
        catBadge.innerText = 'ALL POSTS';
        title.innerText = currentDay === 'all' ? 'All Trip Photos' : `All Posts in Day ${currentDay.replace('day', '')}`;
        featuredBox.style.opacity = '0.4';
        featuredName.innerText = 'Select a specific post';
      } else {
        const postObj = posts.find(p => p.id === currentPost);
        catBadge.innerText = 'DESTINATION POST';
        title.innerText = postObj ? postObj.name : currentPost;

        const featPath = state.featured[currentPost];
        if (featPath) {
          featuredBox.style.opacity = '1';
          featuredBox.style.borderColor = '#fbbf24';
          featuredName.innerText = featPath.split('/').pop();
        } else {
          featuredBox.style.opacity = '0.9';
          featuredBox.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          featuredName.innerText = 'None chosen (click ★)';
        }
      }
    }

    function setFilter(filter, doRender = true) {
      currentFilter = filter;
      syncStorage();
      ['all', 'featured', 'selected', 'captioned', 'unreviewed', 'rejected'].forEach(f => {
        const btn = document.getElementById('filter-' + f);
        if (btn) {
          if (f === filter) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      });
      if (doRender) renderGrid();
    }

    function getFilteredItems() {
      return currentItems.filter(item => {
        const isSel = !!state.selected[item.id];
        const isRej = !!state.rejected[item.id];
        const hasCap = !!state.captions[item.id];
        const isFeat = !!(state.featured[item.post] === item.id);

        if (currentFilter === 'featured') return isFeat;
        if (currentFilter === 'selected') return isSel;
        if (currentFilter === 'rejected') return isRej;
        if (currentFilter === 'captioned') return hasCap;
        if (currentFilter === 'unreviewed') return !isSel && !isRej;
        return true;
      });
    }

    function updateFilterCounts() {
      let cAll = currentItems.length;
      let cFeat = 0, cSel = 0, cCap = 0, cUnrev = 0, cRej = 0;
      currentItems.forEach(it => {
        if (state.featured[it.post] === it.id) cFeat++;
        if (state.selected[it.id]) cSel++;
        if (state.rejected[it.id]) cRej++;
        if (state.captions[it.id]) cCap++;
        if (!state.selected[it.id] && !state.rejected[it.id]) cUnrev++;
      });
      document.getElementById('filter-count-all').innerText = cAll;
      document.getElementById('filter-count-featured').innerText = cFeat;
      document.getElementById('filter-count-selected').innerText = cSel;
      document.getElementById('filter-count-captioned').innerText = cCap;
      document.getElementById('filter-count-unreviewed').innerText = cUnrev;
      document.getElementById('filter-count-rejected').innerText = cRej;
    }

    function renderGrid() {
      const filtered = getFilteredItems();
      document.getElementById('post-header-stats').innerText = `${filtered.length} photos shown (${currentItems.length} total in this view)`;

      const grid = document.getElementById('photo-grid');
      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:60px 0;text-align:center;color:#71717a;font-family:monospace;font-size:13px;">No photos match the current filter.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((item, idx) => {
        const isSel = !!state.selected[item.id];
        const isRej = !!state.rejected[item.id];
        const isFeat = (state.featured[item.post] === item.id);
        const caption = state.captions[item.id] || '';

        let cardClass = 'photo-card';
        if (isFeat) cardClass += ' is-featured';
        else if (isSel) cardClass += ' is-selected';
        else if (isRej) cardClass += ' is-rejected';

        return `
          <div class="${cardClass}" id="card-${idx}">
            <div class="thumb-wrap" onclick="openLightbox(${idx})">
              ${item.isVideo ? `
                <video src="${item.url}#t=0.5" preload="metadata"></video>
                <div class="video-play-icon">▶</div>
              ` : `
                <img src="${item.url}" loading="lazy" />
              `}

              <div class="badge-bar">
                ${isFeat ? '<span class="badge badge-cover">★ COVER</span>' : ''}
                ${isSel && !isFeat ? '<span class="badge badge-selected">✓ SELECTED</span>' : ''}
                ${isRej ? '<span class="badge badge-rejected">✕ REJECTED</span>' : ''}
                ${caption ? '<span class="badge badge-caption">💬 NOTE</span>' : ''}
              </div>

              <button 
                onclick="toggleFeatured('${item.id}', '${item.post}', event)" 
                class="cover-toggle-btn ${isFeat ? 'active' : ''}" 
                title="${isFeat ? 'Unset featured cover' : 'Set as Featured Cover'}"
              >
                ${isFeat ? '★ COVER' : '☆ COVER'}
              </button>
            </div>

            <div class="card-footer">
              <div class="card-meta">
                <span title="${item.postName}"># ${item.postName}</span>
                <span style="color:#52525b;">${item.name.slice(-10)}</span>
              </div>

              <input 
                type="text" 
                value="${escapeHtml(caption)}" 
                placeholder="Click to add note / caption..." 
                onblur="saveInlineCaption('${item.id}', this.value)"
                onkeydown="if(event.key === 'Enter') { this.blur(); }"
                class="caption-input"
              />

              <div class="card-decision-bar">
                <button onclick="setDecision('${item.id}', '${isSel ? 'none' : 'selected'}')" class="decision-btn select ${isSel ? 'active' : ''}">
                  ✓ Select
                </button>
                <button onclick="setDecision('${item.id}', '${isRej ? 'none' : 'rejected'}')" class="decision-btn reject ${isRej ? 'active' : ''}">
                  ✕ Reject
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function escapeHtml(text) {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    async function toggleFeatured(itemId, postId, event) {
      if (event) event.stopPropagation();
      showSaveIndicator('Saving cover...');
      try {
        const res = await fetch('/api/feature', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: itemId, post: postId })
        });
        const data = await res.json();
        if (data.success) {
          state.featured = data.featured || {};
          if (data.state) {
            state.selected = data.state.selected || {};
            state.rejected = data.state.rejected || {};
          }
          updatePostHeaderInfo();
          updateGlobalCounters();
          renderPostList();
          renderGrid();
          updateFilterCounts();
          showSaveIndicator('Cover Saved ✓');
        } else {
          showSaveIndicator('Save Error ✕', true);
        }
      } catch (err) {
        console.error('Toggle feature error:', err);
        showSaveIndicator('Save Failed ✕', true);
      }
    }

    async function setDecision(itemId, decision) {
      if (decision === 'selected') {
        state.selected[itemId] = true;
        delete state.rejected[itemId];
      } else if (decision === 'rejected') {
        state.rejected[itemId] = true;
        delete state.selected[itemId];
        for (const [pId, fId] of Object.entries(state.featured)) {
          if (fId === itemId) delete state.featured[pId];
        }
      } else {
        delete state.selected[itemId];
        delete state.rejected[itemId];
      }

      updateGlobalCounters();
      renderGrid();
      updateFilterCounts();
      showSaveIndicator('Saving...');

      try {
        const res = await fetch('/api/decide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: itemId, decision })
        });
        const data = await res.json();
        if (data.success) {
          if (data.state) {
            state.selected = data.state.selected || {};
            state.rejected = data.state.rejected || {};
            state.featured = data.state.featured || {};
            state.captions = data.state.captions || {};
          }
          updateGlobalCounters();
          updateFilterCounts();
          showSaveIndicator('Saved to file ✓');
        } else {
          showSaveIndicator('Save Error ✕', true);
        }
      } catch (err) {
        console.error('Save decision error:', err);
        showSaveIndicator('Save Failed ✕', true);
      }
    }

    async function postBulkAction(action) {
      if (currentPost === 'all') {
        alert('Please select a specific post from the left sidebar to perform post-level bulk actions.');
        return;
      }
      showSaveIndicator('Applying bulk action...');
      try {
        const res = await fetch('/api/post_action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ post: currentPost, action, folder: currentDay })
        });
        const data = await res.json();
        if (data.success && data.state) {
          state = data.state;
          updateGlobalCounters();
          renderGrid();
          updateFilterCounts();
          showSaveIndicator('Saved to file ✓');
        }
      } catch (err) {
        showSaveIndicator('Bulk Action Failed ✕', true);
      }
    }

    async function saveInlineCaption(itemId, caption) {
      caption = caption.trim();
      if (caption) {
        state.captions[itemId] = caption;
      } else {
        delete state.captions[itemId];
      }
      updateGlobalCounters();
      updateFilterCounts();
      showSaveIndicator('Saving note...');
      try {
        const res = await fetch('/api/caption', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: itemId, caption })
        });
        const data = await res.json();
        if (data.success) {
          showSaveIndicator('Note Saved ✓');
        }
      } catch (err) {
        showSaveIndicator('Save Failed ✕', true);
      }
    }

    function updateGlobalCounters() {
      const featCount = Object.keys(state.featured).length;
      const selCount = Object.keys(state.selected).length;
      const rejCount = Object.keys(state.rejected).length;
      const totalAll = folders.reduce((sum, f) => sum + f.count, 0);

      document.getElementById('featured-counter').innerText = `★ ${featCount} Covers`;
      document.getElementById('selected-counter').innerText = `✓ ${selCount} Selected`;
      document.getElementById('rejected-counter').innerText = `✕ ${rejCount} Rejected`;
      document.getElementById('total-counter').innerText = `${totalAll} Total`;
    }

    function handleSearch(val) {
      searchQuery = val.trim();
      fetchItems();
    }

    // Lightbox Modal
    function openLightbox(idx) {
      activeIndex = idx;
      const filtered = getFilteredItems();
      const item = filtered[idx];
      if (!item) return;

      const isFeat = (state.featured[item.post] === item.id);
      document.getElementById('lightbox-title').innerText = `${item.name} (${idx + 1} of ${filtered.length})`;

      const featBadge = document.getElementById('lightbox-badge-featured');
      const featBtn = document.getElementById('lightbox-btn-featured');

      if (isFeat) {
        featBadge.style.display = 'inline-block';
        featBtn.innerText = '★ Featured Cover (Click to Unset)';
        featBtn.classList.add('active');
      } else {
        featBadge.style.display = 'none';
        featBtn.innerText = '★ Set as Featured Cover (F)';
        featBtn.classList.remove('active');
      }

      const img = document.getElementById('lightbox-img');
      const vid = document.getElementById('lightbox-video');
      const capInput = document.getElementById('lightbox-caption-input');
      capInput.value = state.captions[item.id] || '';

      if (item.isVideo) {
        img.style.display = 'none';
        vid.style.display = 'block';
        vid.src = item.url;
      } else {
        vid.style.display = 'none';
        img.style.display = 'block';
        img.src = item.url;
      }

      document.getElementById('lightbox-modal').classList.add('open');
    }

    function closeLightbox() {
      document.getElementById('lightbox-modal').classList.remove('open');
      const vid = document.getElementById('lightbox-video');
      vid.pause();
      vid.src = '';
    }

    function prevItem() {
      const filtered = getFilteredItems();
      if (activeIndex > 0) openLightbox(activeIndex - 1);
      else openLightbox(filtered.length - 1);
    }

    function nextItem() {
      const filtered = getFilteredItems();
      if (activeIndex < filtered.length - 1) openLightbox(activeIndex + 1);
      else openLightbox(0);
    }

    function decideCurrent(decision) {
      const filtered = getFilteredItems();
      const item = filtered[activeIndex];
      if (item) {
        setDecision(item.id, decision);
        nextItem();
      }
    }

    function toggleCurrentFeatured() {
      const filtered = getFilteredItems();
      const item = filtered[activeIndex];
      if (item) {
        toggleFeatured(item.id, item.post);
        setTimeout(() => openLightbox(activeIndex), 50);
      }
    }

    function handleCaptionKey(e) {
      if (e.key === 'Enter') saveLightboxCaption();
    }

    function saveLightboxCaption() {
      const filtered = getFilteredItems();
      const item = filtered[activeIndex];
      if (item) {
        const val = document.getElementById('lightbox-caption-input').value;
        saveInlineCaption(item.id, val);
        renderGrid();
      }
    }

    window.addEventListener('keydown', (e) => {
      const isModalOpen = document.getElementById('lightbox-modal').classList.contains('open');
      const isTyping = document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');

      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (isTyping) return;

      if (e.key === 'ArrowRight') {
        if (isModalOpen) nextItem();
      } else if (e.key === 'ArrowLeft') {
        if (isModalOpen) prevItem();
      } else if (e.key === 'f' || e.key === 'F') {
        if (isModalOpen) {
          e.preventDefault();
          toggleCurrentFeatured();
        }
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowUp') {
        if (isModalOpen) decideCurrent('selected');
      } else if (e.key === 'r' || e.key === 'R' || e.key === 'ArrowDown') {
        if (isModalOpen) decideCurrent('rejected');
      } else if (e.key === 'c' || e.key === 'C') {
        if (isModalOpen) {
          e.preventDefault();
          document.getElementById('lightbox-caption-input').focus();
        }
      } else if (e.key === ' ' && !isModalOpen) {
        e.preventDefault();
        openLightbox(0);
      }
    });

    async function exportSelected() {
      const selCount = Object.keys(state.selected).length;
      const featCount = Object.keys(state.featured).length;
      if (selCount === 0) {
        alert('No photos selected yet! Select some photos first.');
        return;
      }
      if (!confirm(`Export ${selCount} selected photos, ${featCount} featured covers, and story notes to curated_selected/?`)) return;

      const res = await fetch('/api/export', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`Export completed!\n• ${data.copied} selected media files copied\n• ${data.featured} featured cover photos indexed\n• Files saved in:\n${data.target}`);
      }
    }

    async function syncToWebsite() {
      const featCount = Object.keys(state.featured).length;
      if (featCount === 0) {
        alert('No featured cover photos selected yet. Mark cover photos with ★ first!');
        return;
      }
      if (!confirm(`Sync ${featCount} featured cover photos to shreeharsha.com/public/taiwan/?`)) return;

      const res = await fetch('/api/sync_website', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully synced ${data.synced} featured photos to shreeharsha.com website assets!`);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  </script>
</body>
</html>
"""

class DualStackThreadingServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6
    daemon_threads = True
    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        super().server_bind()

if __name__ == '__main__':
    DualStackThreadingServer.allow_reuse_address = True
    try:
        httpd = DualStackThreadingServer(('::', PORT), CuratorHandler)
    except Exception:
        # Fallback to standard IPv4 if IPv6 socket fails
        http.server.ThreadingHTTPServer.allow_reuse_address = True
        httpd = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), CuratorHandler)

    print(f'Starting Taiwan Photo Curator at http://localhost:{PORT}...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server.')
