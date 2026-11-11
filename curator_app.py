#!/usr/bin/env python3
"""
Taiwan Photo Curator & Reviewer - Upgraded
A standalone, ultra-fast local web application for reviewing, selecting, rejecting,
captioning/annotating photos, selecting by post, and picking featured cover photos.
Runs locally at: http://localhost:8765
"""

import http.server
import socketserver
import json
import os
import shutil
import urllib.parse
from pathlib import Path
from PIL import Image, ImageOps

PORT = 8765
BASE_DIR = Path('/Users/harshap/shreeharsha/taiwan-photos').resolve()
WEB_APP_DIR = Path('/Users/harshap/shreeharsha/shreeharsha.com').resolve()
SELECTIONS_FILE = BASE_DIR / 'CURATION_STATE.json'

# Comprehensive metadata mapping prefix clusters to friendly post / destination names
POSTS_METADATA = {
    # Day 1
    "day1_00_transit_flight": {"name": "Flight & Arrival", "chinese": "航班抵達桃園", "day": "day1", "placeId": "taoyuan-airport"},
    "day1_01_taoyuan_airport": {"name": "Taoyuan Airport & MRT", "chinese": "桃園機場與機場捷運", "day": "day1", "placeId": "taoyuan-airport"},
    "day1_02_taipei_main_station": {"name": "Taipei Main Station", "chinese": "台北車站大廳", "day": "day1", "placeId": "taipei-main-station"},
    "day1_03_ximending": {"name": "Ximending Youth District", "chinese": "西門町徒步區", "day": "day1", "placeId": "ximending"},
    "day1_04_longshan_temple": {"name": "Mengjia Longshan Temple", "chinese": "艋舺龍山寺", "day": "day1", "placeId": "longshan-temple"},
    "day1_05_guangzhou_night_market": {"name": "Guangzhou St Night Market", "chinese": "廣州街夜市", "day": "day1", "placeId": "guangzhou-night-market"},

    # Day 2
    "day2_00_taipei_viahotel": {"name": "Via Hotel & Taipei Morning", "chinese": "台北晨間散步", "day": "day2", "placeId": "ximending"},
    "day2_01_jiufen_old_street": {"name": "Jiufen Old Street", "chinese": "九份老街與山城步道", "day": "day2", "placeId": "jiufen-old-street"},
    "day2_02_jiufen_qingyun_temple": {"name": "Jiufen Qingyun Temple", "chinese": "九份青雲殿 (神農大帝廟)", "day": "day2", "placeId": "jiufen-qingyun-temple"},
    "day2_02_transit_route303": {"name": "Ruifang Coastal Highway", "chinese": "瑞芳濱海公路", "day": "day2", "placeId": "jiufen-qingyun-temple"},
    "day2_02_transit_to_badouzi": {"name": "Transit to Badouzi", "chinese": "前往八斗子沿線", "day": "day2", "placeId": "badouzi-trail"},
    "day2_03_badouzi_coastal_trail": {"name": "Badouzi Coastal Trail & Wangyou", "chinese": "八斗子濱海步道與望幽谷", "day": "day2", "placeId": "badouzi-trail"},
    "day2_04_taipei_evening": {"name": "Taipei Evening Return", "chinese": "傍晚台北回程", "day": "day2", "placeId": "ximending"},

    # Day 3
    "day3_00_transit_cards": {"name": "Transit Cards & EasyCard", "chinese": "悠遊卡與交通紀錄", "day": "day3", "placeId": "xinyi-district"},
    "day3_01_mrt_commute_right_escalator": {"name": "MRT Escalator Etiquette", "chinese": "捷運右側站立文化", "day": "day3", "placeId": "xinyi-district"},
    "day3_02_taipei_101_exterior": {"name": "Taipei 101 Skyline & Exterior", "chinese": "台北101大樓外觀", "day": "day3", "placeId": "taipei-101"},
    "day3_03_taipei_101_observatory": {"name": "Taipei 101 Observatory 89F", "chinese": "台北101觀景台", "day": "day3", "placeId": "taipei-101"},
    "day3_04_taipei_101_wind_damper": {"name": "Taipei 101 Tuned Mass Damper", "chinese": "660公噸風阻尼球", "day": "day3", "placeId": "taipei-101"},
    "day3_05_xinyi_skybridge_district": {"name": "Xinyi Commercial District", "chinese": "信義商圈天橋夜景", "day": "day3", "placeId": "xinyi-district"},
    "day3_06_xiangti_avenue_plaza": {"name": "Xiangti Avenue Plaza", "chinese": "香堤大道廣場", "day": "day3", "placeId": "xinyi-district"},

    # Day 4
    "day4_00_thsr_transit": {"name": "THSR 700T Bullet Train", "chinese": "台灣高鐵700T (台北-左營)", "day": "day4", "placeId": "thsr-bullet-train"},
    "day4_01_fo_guang_shan": {"name": "Fo Guang Shan Buddha Museum", "chinese": "佛光山佛陀紀念館", "day": "day4", "placeId": "fo-guang-shan"},
    "day4_02_pier2_art_center": {"name": "Pier-2 Art Center & Harbor", "chinese": "駁二藝術特區與輕軌", "day": "day4", "placeId": "pier2-art-center"},
    "day4_03_cijin_island": {"name": "Cijin Island & Cihou Fort", "chinese": "旗津島與旗後砲台", "day": "day4", "placeId": "cijin-island"},
    "day4_04_kaohsiung_city": {"name": "Kaohsiung Harbor & City Night", "chinese": "高雄港灣夜景", "day": "day4", "placeId": "pier2-art-center"},

    # Day 5
    "day5_00_alishan_highway": {"name": "Alishan Highway Ascent", "chinese": "阿里山公路與雲海", "day": "day5", "placeId": "alishan-forest-railway"},
    "day5_01_alishan_station": {"name": "Alishan Forest Railway & Station", "chinese": "阿里山車站與森林鐵路", "day": "day5", "placeId": "alishan-forest-railway"},
    "day5_02_giant_trees_trail": {"name": "Giant Tree Plank Trail", "chinese": "巨木群棧道", "day": "day5", "placeId": "alishan-giant-trees"},
    "day5_03_alishan_forest": {"name": "Alishan Sacred Cypress Forest", "chinese": "神木森林與受鎮宮", "day": "day5", "placeId": "alishan-giant-trees"},
    "day5_04_evening_transit": {"name": "Alishan Mountain Descent", "chinese": "阿里山下山回程", "day": "day5", "placeId": "alishan-forest-railway"},

    # Day 6
    "day6_00_mountain_drive": {"name": "Yangmingshan Mountain Drive", "chinese": "陽明山景觀公路", "day": "day6", "placeId": "xiaoyoukeng-fumaroles"},
    "day6_01_xiaoyoukeng_fumaroles": {"name": "Xiaoyoukeng Sulfur Fumaroles", "chinese": "小油坑硫磺地熱噴氣孔", "day": "day6", "placeId": "xiaoyoukeng-fumaroles"},
    "day6_02_lengshuikeng_hotspring": {"name": "Lengshuikeng & Suspension Bridge", "chinese": "冷水坑與菁山吊橋", "day": "day6", "placeId": "lengshuikeng-hotspring"},
    "day6_03_qingtiangang_grassland": {"name": "Qingtiangang Grassland & Buffaloes", "chinese": "擎天崗大草原與水牛群", "day": "day6", "placeId": "qingtiangang-grassland"},
    "day6_04_shilin_evening": {"name": "Yangmingshan Evening Descent", "chinese": "陽明山傍晚回程", "day": "day6", "placeId": "qingtiangang-grassland"},

    # Day 7
    "day7_00_jinshan_coast": {"name": "Jinshan Coastal Highway", "chinese": "金山北海岸公路", "day": "day7", "placeId": "jinshan-coastal-highway"},
    "day7_01_thermal_valley": {"name": "Xinbeitou Thermal Valley", "chinese": "新北投地熱谷", "day": "day7", "placeId": "beitou-thermal-valley"},
    "day7_02_sulfur_valley": {"name": "Beitou Sulfur Valley Geothermal", "chinese": "北投硫磺谷地熱景觀區", "day": "day7", "placeId": "beitou-sulfur-valley"},
    "day7_03_shilin_night_market": {"name": "Shilin Night Market", "chinese": "士林夜市美食", "day": "day7", "placeId": "shilin-night-market"},
    "day7_04_yongkang_street": {"name": "Yongkang Street Stroll", "chinese": "永康街美食散步", "day": "day7", "placeId": "shilin-night-market"},
}

def load_state():
    if SELECTIONS_FILE.exists():
        try:
            with open(SELECTIONS_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if 'captions' not in data:
                    data['captions'] = {}
                if 'featured' not in data:
                    data['featured'] = {}
                return data
        except Exception:
            pass
    return {'selected': {}, 'rejected': {}, 'captions': {}, 'featured': {}}

def save_state(state):
    with open(SELECTIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def get_post_info(filename, folder_rel):
    stem = Path(filename).stem
    post_id = stem.split('_photo_')[0].split('_video_')[0]
    if post_id in POSTS_METADATA:
        info = POSTS_METADATA[post_id]
        return post_id, info['name'], info['chinese'], info['day'], info['placeId']
    # Fallback derivation
    clean_name = post_id.replace('_', ' ').title()
    day = folder_rel.split('/')[0]
    return post_id, clean_name, '', day, ''

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

            # Scan posts in this day
            for f in sorted(p.iterdir()):
                if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                    post_id, post_name, chinese, day, place_id = get_post_info(f.name, name)
                    if post_id not in posts_dict:
                        posts_dict[post_id] = {
                            'id': post_id,
                            'name': post_name,
                            'chinese': chinese,
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

    # Also scan split subfolders if any
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
            self.end_headers()
            self.wfile.write(HTML_PAGE.encode('utf-8'))

        elif url.path == '/api/folders':
            day_folders, posts_list = scan_catalog()
            state = load_state()
            # Annotate posts with featured and selected counts
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

            # If folder is 'all', scan all primary days
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
                        post_id, post_name, chinese, day, place_id = get_post_info(f.name, curr_folder)

                        # Filter by post if specified
                        if post_filter != 'all' and post_id != post_filter:
                            continue

                        # Check if featured
                        is_featured = (state.get('featured', {}).get(post_id) == rel_path)

                        # Search filter
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
                            'chinese': chinese,
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
                # If was featured, remove featured
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
                # Toggle off
                del state['featured'][post_id]
                is_now_featured = False
            else:
                state['featured'][post_id] = item_id
                # Automatically select the featured photo
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
            action = payload.get('action')  # 'select_all', 'reject_all', 'reset'
            folder = payload.get('folder', 'day1')
            state = load_state()

            # Find all files belonging to this post
            affected = []
            target_dirs = [BASE_DIR / folder] if folder != 'all' else [BASE_DIR / f'day{i}' for i in range(1, 8)]
            for d in target_dirs:
                if d.is_dir():
                    for f in d.iterdir():
                        if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                            p_id, _, _, _, _ = get_post_info(f.name, d.name)
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
                f.write('# Curated Taiwan Photos, Stories & Featured Covers\n\n')
                f.write(f'Total selected files: {copied}\n')
                f.write(f'Total featured post covers: {len(featured_export)}\n\n')

                # Group by post
                items_by_post = {}
                for item_id in sorted(state.get('selected', {}).keys()):
                    p_id, p_name, p_cn, day, _ = get_post_info(Path(item_id).name, Path(item_id).parent.name)
                    if p_id not in items_by_post:
                        items_by_post[p_id] = {'name': p_name, 'chinese': p_cn, 'day': day, 'items': []}
                    items_by_post[p_id]['items'].append(item_id)

                for p_id, p_data in sorted(items_by_post.items()):
                    feat_cover = featured_export.get(p_id)
                    f.write(f'## {p_data["name"]} ({p_data["chinese"]})\n')
                    f.write(f'- **Day**: {p_data["day"].upper()}\n')
                    if feat_cover:
                        f.write(f'- **🌟 Featured Cover**: `{feat_cover}`\n')
                    f.write(f'- **Selected Photos ({len(p_data["items"])})**:\n')
                    for it in p_data['items']:
                        cap = state.get('captions', {}).get(it, '')
                        is_cov = ' 🌟 **[COVER]**' if it == feat_cover else ''
                        if cap:
                            f.write(f'  - `{it}`{is_cov}: "{cap}"\n')
                        else:
                            f.write(f'  - `{it}`{is_cov}\n')
                    f.write('\n')

            self.send_json({'success': True, 'copied': copied, 'featured': len(featured_export), 'target': str(target_dir)})

        elif url.path == '/api/sync_website':
            # Synchronize chosen featured photos to web app public/taiwan/ thumbnails
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
                            # Generate an optimized cover photo named cover-<place_id>.jpg
                            dst_filename = f'cover-{place_id}.jpg' if place_id else f'cover-{post_id}.jpg'
                            dst_file = public_taiwan / dst_filename
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
                            synced += 1
                            details.append(f'{post_id} -> {dst_filename}')
                        except Exception as e:
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
  <title>Taiwan Photo Curator & Post Manager</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(24, 24, 27, 0.5); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(63, 63, 70, 0.6); border-radius: 9999px; }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.2); }
      50% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.45); }
    }
    .featured-glow { animation: pulseGlow 2.5s infinite ease-in-out; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-300">

  <!-- Top Navigation Header -->
  <header class="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 flex items-center justify-center font-black text-zinc-950 shadow-lg shadow-amber-500/20 text-lg">
        📸
      </div>
      <div>
        <h1 class="text-sm sm:text-base font-bold tracking-tight text-white flex items-center space-x-2">
          <span>Taiwan Photo Curator</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Post & Cover Studio</span>
        </h1>
        <p class="text-[11px] text-zinc-400 font-mono">Filter by Post • Select Featured Covers • Add Story Captions</p>
      </div>
    </div>

    <!-- Search Input & Stats Bar -->
    <div class="flex items-center space-x-3">
      <!-- Search Input -->
      <div class="relative w-44 sm:w-64 hidden sm:block">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search post, note, file..." 
          oninput="handleSearch(this.value)"
          class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition font-sans"
        />
        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
      </div>

      <!-- Counters -->
      <div class="hidden lg:flex items-center space-x-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-xl text-xs font-mono">
        <span class="text-amber-400 font-bold" id="featured-counter">★ 0 Covers</span>
        <span class="text-zinc-600">|</span>
        <span class="text-emerald-400 font-bold" id="selected-counter">✓ 0 Sel</span>
        <span class="text-zinc-600">|</span>
        <span class="text-rose-400 font-bold" id="rejected-counter">✕ 0 Rej</span>
        <span class="text-zinc-600">|</span>
        <span class="text-zinc-400" id="total-counter">0 Total</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-2">
        <button onclick="syncToWebsite()" title="Sync chosen cover photos directly to website thumbnails" class="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-amber-400 font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center space-x-1 cursor-pointer">
          <span>🚀</span>
          <span class="hidden sm:inline">Sync Covers</span>
        </button>
        <button onclick="exportSelected()" class="bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-zinc-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow-lg shadow-amber-500/10 flex items-center space-x-1 cursor-pointer">
          <span>Export Curated</span>
          <span>→</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Layout -->
  <div class="flex-1 flex overflow-hidden">
    
    <!-- Sidebar -->
    <aside class="w-72 bg-zinc-900/40 border-r border-zinc-800/80 flex flex-col justify-between shrink-0 overflow-hidden">
      
      <!-- Top Section: Days & Posts Explorer -->
      <div class="flex-1 overflow-y-auto p-3.5 custom-scrollbar space-y-4">
        
        <!-- Day Selector Tabs -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">1. Select Day</h2>
            <button onclick="loadDay('all')" class="text-[10px] font-mono text-zinc-400 hover:text-amber-400 transition cursor-pointer">All Days</button>
          </div>
          <div class="grid grid-cols-4 gap-1.5" id="day-pill-list">
            <!-- Day buttons rendered via JS -->
          </div>
        </div>

        <!-- Post Filter List for Active Day -->
        <div class="pt-2 border-t border-zinc-800/60">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center space-x-1">
              <span>2. Posts in</span>
              <span class="text-amber-400 font-bold" id="posts-sub-title">Day 1</span>
            </h2>
            <button onclick="selectPost('all')" id="post-all-btn" class="text-[10px] font-mono text-zinc-400 hover:text-amber-400 cursor-pointer">All Posts</button>
          </div>
          
          <div class="space-y-1 max-h-[38vh] overflow-y-auto custom-scrollbar pr-1" id="post-list">
            <!-- Post item buttons inserted via JS -->
          </div>
        </div>

        <!-- View Filter Mode -->
        <div class="pt-2 border-t border-zinc-800/60">
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold">3. Filter Media</h2>
          <div class="space-y-1">
            <button onclick="setFilter('all')" id="filter-all" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition bg-zinc-800 text-white font-bold cursor-pointer">
              <span>All Media in Post</span>
              <span class="text-[10px] font-mono" id="filter-count-all">0</span>
            </button>
            <button onclick="setFilter('featured')" id="filter-featured" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-amber-400 hover:bg-zinc-800/60 cursor-pointer">
              <span class="flex items-center space-x-1.5">
                <span>★</span>
                <span>Featured Covers Only</span>
              </span>
              <span class="text-[10px] font-mono px-1.5 rounded bg-amber-500/20" id="filter-count-featured">0</span>
            </button>
            <button onclick="setFilter('selected')" id="filter-selected" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-emerald-400 hover:bg-zinc-800/60 cursor-pointer">
              <span>✓ Selected Only</span>
              <span class="text-[10px] font-mono px-1.5 rounded bg-emerald-500/20" id="filter-count-selected">0</span>
            </button>
            <button onclick="setFilter('captioned')" id="filter-captioned" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-sky-400 hover:bg-zinc-800/60 cursor-pointer">
              <span>💬 With Notes / Captions</span>
              <span class="text-[10px] font-mono" id="filter-count-captioned">0</span>
            </button>
            <button onclick="setFilter('unreviewed')" id="filter-unreviewed" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-zinc-400 hover:bg-zinc-800/60 cursor-pointer">
              <span>⏳ Unreviewed Only</span>
              <span class="text-[10px] font-mono" id="filter-count-unreviewed">0</span>
            </button>
            <button onclick="setFilter('rejected')" id="filter-rejected" class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-rose-400 hover:bg-zinc-800/60 cursor-pointer">
              <span>✕ Rejected Only</span>
              <span class="text-[10px] font-mono" id="filter-count-rejected">0</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Bottom Keyboard Shortcuts Guide -->
      <div class="p-3 bg-zinc-950/80 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
        <span class="text-zinc-200 font-bold block mb-1">⚡ Hotkeys</span>
        <div class="grid grid-cols-2 gap-y-1 text-zinc-400">
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-amber-400 font-bold">F</kbd> Cover</div>
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-emerald-400 font-bold">S</kbd> Select</div>
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-rose-400 font-bold">R</kbd> Reject</div>
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-white font-bold">C</kbd> Caption</div>
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-white font-bold">← / →</kbd> Nav</div>
          <div><kbd class="bg-zinc-800 px-1 py-0.5 rounded text-white font-bold">Space</kbd> View</div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-5 sm:p-6" id="gallery-container">
      
      <!-- Top Post Context Bar & Post Actions -->
      <div class="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 mb-6 backdrop-blur">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <!-- Post Details -->
          <div>
            <div class="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-1">
              <span class="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-bold" id="badge-day">DAY 1</span>
              <span>›</span>
              <span class="text-amber-400" id="badge-post-category">POST</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <span id="post-header-title">Ximending Youth District</span>
              <span class="text-sm font-normal text-zinc-400" id="post-header-chinese">(西門町徒步區)</span>
            </h2>
            <p class="text-xs text-zinc-400 font-mono mt-0.5" id="post-header-stats">Loading items...</p>
          </div>

          <!-- Featured Photo Callout & Post Bulk Controls -->
          <div class="flex items-center space-x-3 shrink-0">
            
            <!-- Current Featured Indicator -->
            <div class="flex items-center space-x-2 bg-zinc-950/80 border border-amber-500/30 px-3 py-1.5 rounded-xl" id="post-featured-display">
              <span class="text-amber-400 text-sm">★</span>
              <div class="text-[11px] font-mono leading-tight">
                <span class="text-zinc-400 block">Featured Cover:</span>
                <span class="text-amber-300 font-bold truncate max-w-[130px] block" id="post-featured-name">None chosen</span>
              </div>
            </div>

            <!-- Post Quick Actions -->
            <div class="flex items-center space-x-1.5">
              <button onclick="postBulkAction('select_all')" title="Select all photos in this post" class="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition cursor-pointer">
                ✓ Select All Post
              </button>
              <button onclick="postBulkAction('reject_all')" title="Reject all photos in this post" class="px-2.5 py-2 rounded-xl text-xs font-mono bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition cursor-pointer">
                ✕ Reject
              </button>
              <button onclick="postBulkAction('reset')" title="Reset decisions for this post" class="px-2.5 py-2 rounded-xl text-xs font-mono bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 hover:text-white transition cursor-pointer">
                ↺ Reset
              </button>
            </div>

          </div>

        </div>
      </div>

      <!-- Photo Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" id="photo-grid">
        <!-- Rendered via JS -->
      </div>
    </main>
  </div>

  <!-- Fullscreen Modal Viewer -->
  <div id="lightbox-modal" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden flex flex-col justify-between p-4" onclick="closeLightbox(event)">
    <div class="flex items-center justify-between text-white font-mono text-xs px-2">
      <div class="flex items-center space-x-3">
        <span id="lightbox-title">Photo Title</span>
        <span id="lightbox-badge-featured" class="hidden px-2 py-0.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-[10px]">★ FEATURED COVER</span>
      </div>
      <div class="flex items-center space-x-3">
        <span class="text-zinc-500 hidden sm:inline">Press ESC to close • F for Cover • S for Select • R for Reject</span>
        <button onclick="closeLightbox()" class="p-1 text-zinc-400 hover:text-white text-lg font-bold">✕</button>
      </div>
    </div>

    <!-- Media Container -->
    <div class="flex-1 flex items-center justify-center my-2 relative overflow-hidden" onclick="event.stopPropagation()">
      <img id="lightbox-img" class="max-h-[66vh] max-w-[88vw] object-contain rounded-lg shadow-2xl" src="" />
      <video id="lightbox-video" class="max-h-[66vh] max-w-[88vw] object-contain rounded-lg shadow-2xl hidden" controls autoplay></video>
      
      <button onclick="prevItem()" class="absolute left-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-amber-500 hover:text-black transition cursor-pointer">←</button>
      <button onclick="nextItem()" class="absolute right-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-amber-500 hover:text-black transition cursor-pointer">→</button>
    </div>

    <!-- Caption / Story Input -->
    <div class="w-full max-w-3xl mx-auto px-4" onclick="event.stopPropagation()">
      <div class="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 flex items-center space-x-2">
        <span class="text-amber-400 text-sm pl-1">💬</span>
        <input 
          type="text" 
          id="lightbox-caption-input" 
          placeholder="Add an explanation or story note for this photo (press Enter to save)..." 
          class="flex-1 bg-transparent border-0 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          onkeydown="handleCaptionKey(event)"
        />
        <button onclick="saveLightboxCaption()" class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-zinc-950 transition cursor-pointer">
          Save Note
        </button>
      </div>
    </div>

    <!-- Lightbox Bottom Actions -->
    <div class="flex items-center justify-center space-x-3 py-2" onclick="event.stopPropagation()">
      <!-- Set as Featured Button -->
      <button onclick="toggleCurrentFeatured()" id="lightbox-btn-featured" class="px-5 py-2.5 rounded-xl font-bold text-xs font-mono border transition flex items-center space-x-1.5 cursor-pointer bg-zinc-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-zinc-950">
        <span class="text-base leading-none">★</span>
        <span id="lightbox-featured-label">Set as Featured Cover (F)</span>
      </button>

      <button onclick="decideCurrent('selected')" class="px-5 py-2.5 rounded-xl font-bold text-xs font-mono bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition cursor-pointer">
        <span>✓ Select (S)</span>
      </button>

      <button onclick="decideCurrent('none')" class="px-3.5 py-2 rounded-xl text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer">
        Reset
      </button>

      <button onclick="decideCurrent('rejected')" class="px-5 py-2.5 rounded-xl font-bold text-xs font-mono bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 flex items-center space-x-1.5 transition cursor-pointer">
        <span>✕ Reject (R)</span>
      </button>
    </div>
  </div>

  <script>
    let folders = [];
    let posts = [];
    let state = { selected: {}, rejected: {}, captions: {}, featured: {} };
    let currentDay = 'day1';
    let currentPost = 'all';
    let currentFilter = 'all';
    let searchQuery = '';
    let currentItems = [];
    let activeIndex = 0;

    async function init() {
      const res = await fetch('/api/folders');
      const data = await res.json();
      folders = data.folders;
      posts = data.posts;
      state = data.state;
      if (!state.captions) state.captions = {};
      if (!state.featured) state.featured = {};

      renderDayPills();
      loadDay('day1');
      updateGlobalCounters();
    }

    function renderDayPills() {
      const pillContainer = document.getElementById('day-pill-list');
      const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
      pillContainer.innerHTML = days.map(d => {
        const num = d.replace('day', '');
        const isActive = currentDay === d;
        return `
          <button onclick="loadDay('${d}')" id="day-pill-${d}" class="py-1.5 text-center rounded-lg text-xs font-mono font-bold transition cursor-pointer ${isActive ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}">
            D${num}
          </button>
        `;
      }).join('');
    }

    function renderPostList() {
      const list = document.getElementById('post-list');
      const dayPosts = posts.filter(p => currentDay === 'all' || p.day === currentDay);
      
      document.getElementById('posts-sub-title').innerText = currentDay === 'all' ? 'All Days' : `Day ${currentDay.replace('day', '')}`;
      
      const allBtn = document.getElementById('post-all-btn');
      allBtn.className = currentPost === 'all' ? 'text-[10px] font-mono text-amber-400 font-bold' : 'text-[10px] font-mono text-zinc-400 hover:text-amber-400 cursor-pointer';

      if (dayPosts.length === 0) {
        list.innerHTML = '<div class="text-xs text-zinc-500 font-mono py-2">No posts for this selection.</div>';
        return;
      }

      list.innerHTML = dayPosts.map(p => {
        const isSelected = currentPost === p.id;
        const hasCover = !!state.featured[p.id];
        return `
          <button onclick="selectPost('${p.id}')" id="post-btn-${p.id}" class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between cursor-pointer ${isSelected ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}">
            <span class="truncate flex items-center space-x-1.5 mr-1">
              ${hasCover ? '<span class="text-amber-400 text-xs" title="Featured cover selected">★</span>' : '<span class="text-zinc-600 text-xs">☆</span>'}
              <span class="truncate">${p.name}</span>
            </span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 shrink-0">${p.count}</span>
          </button>
        `;
      }).join('');
    }

    async function loadDay(day) {
      currentDay = day;
      currentPost = 'all';
      renderDayPills();
      renderPostList();
      await fetchItems();
    }

    async function selectPost(postId) {
      currentPost = postId;
      renderPostList();
      await fetchItems();
    }

    async function fetchItems() {
      const url = `/api/items?folder=${encodeURIComponent(currentDay)}&post=${encodeURIComponent(currentPost)}&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      currentItems = data.items;
      updatePostHeaderInfo();
      renderGrid();
      updateFilterCounts();
    }

    function updatePostHeaderInfo() {
      const dayBadge = document.getElementById('badge-day');
      const catBadge = document.getElementById('badge-post-category');
      const title = document.getElementById('post-header-title');
      const chinese = document.getElementById('post-header-chinese');
      const featuredName = document.getElementById('post-featured-name');
      const featuredBox = document.getElementById('post-featured-display');

      dayBadge.innerText = currentDay === 'all' ? 'ALL DAYS' : `DAY ${currentDay.replace('day', '')}`;

      if (currentPost === 'all') {
        catBadge.innerText = 'ALL DESTINATIONS';
        title.innerText = currentDay === 'all' ? 'All Expeditions & Days' : `All Posts in Day ${currentDay.replace('day', '')}`;
        chinese.innerText = '';
        featuredBox.classList.add('opacity-50');
        featuredName.innerText = 'Select a specific post';
      } else {
        const postObj = posts.find(p => p.id === currentPost);
        catBadge.innerText = 'DESTINATION POST';
        title.innerText = postObj ? postObj.name : currentPost;
        chinese.innerText = postObj && postObj.chinese ? `(${postObj.chinese})` : '';

        const featPath = state.featured[currentPost];
        if (featPath) {
          featuredBox.classList.remove('opacity-50');
          featuredBox.classList.add('border-amber-400');
          featuredName.innerText = featPath.split('/').pop();
        } else {
          featuredBox.classList.remove('opacity-50');
          featuredBox.classList.remove('border-amber-400');
          featuredName.innerText = 'None chosen (click ★)';
        }
      }
    }

    function setFilter(filter) {
      currentFilter = filter;
      ['all', 'featured', 'selected', 'captioned', 'unreviewed', 'rejected'].forEach(f => {
        const btn = document.getElementById('filter-' + f);
        if (btn) {
          if (f === filter) {
            btn.className = 'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition bg-zinc-800 text-white font-bold cursor-pointer';
          } else {
            btn.className = 'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer';
          }
        }
      });
      renderGrid();
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
      document.getElementById('post-header-stats').innerText = `${filtered.length} photos shown (out of ${currentItems.length} in this view)`;

      const grid = document.getElementById('photo-grid');
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-zinc-500 font-mono text-sm">No photos match the current filter.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((item, idx) => {
        const isSel = !!state.selected[item.id];
        const isRej = !!state.rejected[item.id];
        const isFeat = (state.featured[item.post] === item.id);
        const caption = state.captions[item.id] || '';

        let borderClass = 'border-zinc-800/80 hover:border-zinc-700';
        if (isFeat) {
          borderClass = 'border-amber-400 ring-2 ring-amber-400/50 featured-glow bg-amber-950/10';
        } else if (isSel) {
          borderClass = 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40';
        } else if (isRej) {
          borderClass = 'border-rose-900/60 opacity-40';
        }

        return `
          <div class="group relative rounded-xl overflow-hidden border transition-all duration-200 bg-zinc-900/70 flex flex-col justify-between ${borderClass}" id="card-${idx}">
            
            <!-- Media Thumbnail Container -->
            <div class="relative aspect-video overflow-hidden bg-black cursor-pointer" onclick="openLightbox(${idx})">
              ${item.isVideo ? `
                <div class="w-full h-full flex items-center justify-center bg-zinc-900">
                  <video src="${item.url}#t=0.5" class="w-full h-full object-cover" preload="metadata"></video>
                  <span class="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xl">▶</span>
                </div>
              ` : `
                <img src="${item.url}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              `}

              <!-- Top Left Badges -->
              <div class="absolute top-2 left-2 flex flex-col space-y-1">
                ${isFeat ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/30">★ COVER</span>' : ''}
                ${isSel && !isFeat ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-zinc-950 shadow">✓ SELECTED</span>' : ''}
                ${isRej ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white shadow">✕ REJECTED</span>' : ''}
                ${caption ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-400 text-zinc-950 shadow">💬 NOTE</span>' : ''}
              </div>

              <!-- Top Right Feature Button -->
              <div class="absolute top-2 right-2">
                <button 
                  onclick="toggleFeatured('${item.id}', '${item.post}', event)" 
                  title="${isFeat ? 'Unset featured cover' : 'Set as Featured Cover for this post'}" 
                  class="p-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer backdrop-blur-md ${isFeat ? 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/40' : 'bg-black/60 text-zinc-400 hover:text-amber-400 hover:bg-black/80'}"
                >
                  ${isFeat ? '★ COVER' : '☆ COVER'}
                </button>
              </div>

            </div>

            <!-- Card Bottom: Caption & Quick Deciders -->
            <div class="p-2.5 bg-zinc-900/90 border-t border-zinc-800/60 flex flex-col justify-between flex-1">
              
              <!-- Post tag & filename -->
              <div class="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span class="truncate max-w-[130px] text-amber-400/80" title="${item.postName}"># ${item.postName}</span>
                <span class="text-zinc-500 text-[9px]">${item.name.slice(-10)}</span>
              </div>

              <!-- Inline Caption Input -->
              <div class="mb-2">
                <input 
                  type="text" 
                  value="${escapeHtml(caption)}" 
                  placeholder="Click to add note / caption..." 
                  onblur="saveInlineCaption('${item.id}', this.value)"
                  onkeydown="if(event.key === 'Enter') { this.blur(); }"
                  class="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-400/70 rounded-lg px-2 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none font-sans"
                />
              </div>

              <!-- Select / Reject Action Buttons -->
              <div class="flex items-center justify-between text-xs pt-1 border-t border-zinc-800/40">
                <button onclick="setDecision('${item.id}', '${isSel ? 'none' : 'selected'}')" class="flex-1 py-1 text-center font-bold font-mono text-[11px] rounded transition cursor-pointer ${isSel ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10'}">
                  ✓ Select
                </button>
                <div class="w-px h-3.5 bg-zinc-800 mx-1"></div>
                <button onclick="setDecision('${item.id}', '${isRej ? 'none' : 'rejected'}')" class="flex-1 py-1 text-center font-bold font-mono text-[11px] rounded transition cursor-pointer ${isRej ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10'}">
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
      const res = await fetch('/api/feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, post: postId })
      });
      const data = await res.json();
      if (data.success) {
        state.featured = data.featured;
        state.selected = data.state.selected;
        state.rejected = data.state.rejected;
        updatePostHeaderInfo();
        updateGlobalCounters();
        renderPostList();
        renderGrid();
        updateFilterCounts();
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

      fetch('/api/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, decision })
      });
    }

    async function postBulkAction(action) {
      if (currentPost === 'all') {
        alert('Please select a specific post from the left sidebar to perform post-level bulk actions.');
        return;
      }
      const res = await fetch('/api/post_action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: currentPost, action, folder: currentDay })
      });
      const data = await res.json();
      if (data.success) {
        state = data.state;
        updateGlobalCounters();
        renderGrid();
        updateFilterCounts();
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
      fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, caption })
      });
    }

    function updateGlobalCounters() {
      const featCount = Object.keys(state.featured).length;
      const selCount = Object.keys(state.selected).length;
      const rejCount = Object.keys(state.rejected).length;
      const totalAll = folders.reduce((sum, f) => sum + f.count, 0);

      document.getElementById('featured-counter').innerText = `★ ${featCount} Covers`;
      document.getElementById('selected-counter').innerText = `✓ ${selCount} Sel`;
      document.getElementById('rejected-counter').innerText = `✕ ${rejCount} Rej`;
      document.getElementById('total-counter').innerText = `${totalAll} Total`;
    }

    function handleSearch(val) {
      searchQuery = val.trim();
      fetchItems();
    }

    // Lightbox Controls
    function openLightbox(idx) {
      activeIndex = idx;
      const filtered = getFilteredItems();
      const item = filtered[idx];
      if (!item) return;

      const isFeat = (state.featured[item.post] === item.id);
      document.getElementById('lightbox-title').innerText = `${item.name} (${idx + 1} of ${filtered.length})`;

      const featBadge = document.getElementById('lightbox-badge-featured');
      const featBtnLabel = document.getElementById('lightbox-featured-label');
      const featBtn = document.getElementById('lightbox-btn-featured');

      if (isFeat) {
        featBadge.classList.remove('hidden');
        featBtnLabel.innerText = 'Featured Cover (Click to Unset)';
        featBtn.className = 'px-5 py-2.5 rounded-xl font-bold text-xs font-mono border transition flex items-center space-x-1.5 cursor-pointer bg-amber-400 text-zinc-950 border-amber-400';
      } else {
        featBadge.classList.add('hidden');
        featBtnLabel.innerText = 'Set as Featured Cover (F)';
        featBtn.className = 'px-5 py-2.5 rounded-xl font-bold text-xs font-mono border transition flex items-center space-x-1.5 cursor-pointer bg-zinc-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-zinc-950';
      }

      const img = document.getElementById('lightbox-img');
      const vid = document.getElementById('lightbox-video');
      const capInput = document.getElementById('lightbox-caption-input');
      capInput.value = state.captions[item.id] || '';

      if (item.isVideo) {
        img.classList.add('hidden');
        vid.classList.remove('hidden');
        vid.src = item.url;
      } else {
        vid.classList.add('hidden');
        img.classList.remove('hidden');
        img.src = item.url;
      }

      document.getElementById('lightbox-modal').classList.remove('hidden');
    }

    function closeLightbox() {
      document.getElementById('lightbox-modal').classList.add('hidden');
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
      const isModalOpen = !document.getElementById('lightbox-modal').classList.contains('hidden');
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
      if (!confirm(`Export ${selCount} selected photos, ${featCount} featured covers, and story notes to taiwan-photos/curated_selected/?`)) return;

      const res = await fetch('/api/export', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`Export completed!\n• ${data.copied} selected media files copied\n• ${data.featured} featured cover photos indexed\n• CURATED_CAPTIONS.json and CURATED_SELECTIONS.md created at:\n${data.target}`);
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
        alert(`Successfully synced ${data.synced} featured photos to shreeharsha.com web assets:\n` + data.details.slice(0, 10).join('\n') + (data.details.length > 10 ? `\n...and ${data.details.length - 10} more` : ''));
      }
    }

    window.onload = init;
  </script>
</body>
</html>
"""

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), CuratorHandler) as httpd:
        print(f'Starting Taiwan Photo Curator & Post Manager at http://localhost:{PORT}...')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down server.')
