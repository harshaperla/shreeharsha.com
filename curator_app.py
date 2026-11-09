#!/usr/bin/env python3
"""
Taiwan Photo Curator & Reviewer
A standalone, ultra-fast local web application for reviewing, selecting, rejecting,
and captioning/annotating photos and videos across all days.
Runs locally at: http://localhost:8765
"""

import http.server
import socketserver
import json
import os
import shutil
import urllib.parse
from pathlib import Path

PORT = 8765
BASE_DIR = Path('/Users/harshap/shreeharsha/taiwan-photos').resolve()
SELECTIONS_FILE = BASE_DIR / 'CURATION_STATE.json'

def load_state():
    if SELECTIONS_FILE.exists():
        try:
            with open(SELECTIONS_FILE, 'r') as f:
                data = json.load(f)
                if 'captions' not in data:
                    data['captions'] = {}
                return data
        except Exception:
            pass
    return {'selected': {}, 'rejected': {}, 'captions': {}}

def save_state(state):
    with open(SELECTIONS_FILE, 'w') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def scan_folders():
    folders = []
    # Primary Days (day1 through day7)
    for name in ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']:
        p = BASE_DIR / name
        if p.is_dir():
            files = [f.name for f in p.iterdir() if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']]
            folders.append({'id': name, 'label': f'Day {name[3:]}', 'path': name, 'count': len(files)})
    
    # Split Archive subfolders
    for split_parent in ['day1-3', 'day4-7']:
        parent_p = BASE_DIR / split_parent
        if parent_p.is_dir():
            for sub in sorted(parent_p.iterdir()):
                if sub.is_dir() and not sub.name.startswith('.'):
                    rel = f'{split_parent}/{sub.name}'
                    files = [f.name for f in sub.iterdir() if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']]
                    folders.append({'id': rel, 'label': f'{split_parent} -> {sub.name}', 'path': rel, 'count': len(files)})
    return folders

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
            folders = scan_folders()
            state = load_state()
            self.send_json({'folders': folders, 'state': state})
        elif url.path == '/api/items':
            query = urllib.parse.parse_qs(url.query)
            folder_rel = query.get('folder', ['day1'])[0]
            folder_path = BASE_DIR / folder_rel
            items = []
            if folder_path.is_dir():
                for f in sorted(folder_path.iterdir()):
                    if not f.name.startswith('.') and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.mp4', '.heic']:
                        rel_path = str(f.relative_to(BASE_DIR))
                        is_video = f.suffix.lower() == '.mp4'
                        parts = f.stem.split('_')
                        category = '_'.join(parts[:3]) if len(parts) >= 3 else folder_rel
                        items.append({
                            'id': rel_path,
                            'name': f.name,
                            'url': f'/media/{rel_path}',
                            'folder': folder_rel,
                            'isVideo': is_video,
                            'category': category,
                            'size': f.stat().st_size
                        })
            self.send_json({'folder': folder_rel, 'items': items})
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
            else:
                state['selected'].pop(item_id, None)
                state['rejected'].pop(item_id, None)
            save_state(state)
            self.send_json({'success': True, 'state': state})

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

        elif url.path == '/api/export':
            state = load_state()
            target_dir = BASE_DIR / 'curated_selected'
            target_dir.mkdir(exist_ok=True)
            copied = 0
            captions_export = {}
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
            
            # Write a README_CAPTIONS.json and markdown file in the curated folder
            with open(target_dir / 'CURATED_CAPTIONS.json', 'w') as f:
                json.dump(captions_export, f, indent=2, ensure_ascii=False)
            
            with open(target_dir / 'CURATED_SELECTIONS.md', 'w') as f:
                f.write('# Curated Taiwan Photos & Captions\n\n')
                f.write(f'Total selected files: {copied}\n\n')
                for item_id in sorted(state.get('selected', {}).keys()):
                    cap = state.get('captions', {}).get(item_id, '')
                    f.write(f'### `{item_id}`\n')
                    if cap:
                        f.write(f'> **Story / Caption**: {cap}\n\n')
                    else:
                        f.write('*No caption provided.*\n\n')

            self.send_json({'success': True, 'copied': copied, 'target': str(target_dir)})
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
  <title>Taiwan Photo Curator & Story Annotator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(24, 24, 27, 0.5); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(63, 63, 70, 0.6); border-radius: 9999px; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300">

  <!-- Top Navigation Header -->
  <header class="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-zinc-950 shadow-lg shadow-emerald-500/20 text-lg">
        📸
      </div>
      <div>
        <h1 class="text-base font-bold tracking-tight text-white flex items-center space-x-2">
          <span>Taiwan Photo Curator</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Reviewer & Captioner</span>
        </h1>
        <p class="text-xs text-zinc-400 font-mono">1,349 photos & videos • Select, Reject & Add Notes</p>
      </div>
    </div>

    <!-- Stats & Actions Bar -->
    <div class="flex items-center space-x-4">
      <div class="hidden sm:flex items-center space-x-2 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-mono">
        <span class="text-emerald-400 font-bold" id="selected-counter">✓ 0 Selected</span>
        <span class="text-zinc-600">|</span>
        <span class="text-rose-400 font-bold" id="rejected-counter">✕ 0 Rejected</span>
        <span class="text-zinc-600">|</span>
        <span class="text-amber-400 font-bold" id="captioned-counter">💬 0 Captioned</span>
        <span class="text-zinc-600">|</span>
        <span class="text-zinc-400" id="total-counter">0 Total</span>
      </div>

      <button onclick="exportSelected()" class="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 cursor-pointer">
        <span>Export Curated & Captions</span>
        <span>→</span>
      </button>
    </div>
  </header>

  <!-- Main Split Layout -->
  <div class="flex-1 flex overflow-hidden">
    
    <!-- Sidebar Folder Selector -->
    <aside class="w-64 bg-zinc-900/50 border-r border-zinc-800/80 p-4 flex flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar">
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 font-semibold">Days & Albums</h2>
        <div class="space-y-1" id="folder-list">
          <!-- Folder buttons inserted via JS -->
        </div>

        <div class="mt-6 pt-4 border-t border-zinc-800/80">
          <h2 class="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 font-semibold">Filter View</h2>
          <div class="space-y-1">
            <button onclick="setFilter('all')" id="filter-all" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition bg-zinc-800 text-white font-bold cursor-pointer">All Media</button>
            <button onclick="setFilter('unreviewed')" id="filter-unreviewed" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer">⏳ Unreviewed Only</button>
            <button onclick="setFilter('selected')" id="filter-selected" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer">✓ Selected Only</button>
            <button onclick="setFilter('captioned')" id="filter-captioned" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer">💬 With Captions Only</button>
            <button onclick="setFilter('rejected')" id="filter-rejected" class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer">✕ Rejected Only</button>
          </div>
        </div>
      </div>

      <!-- Keyboard Shortcuts Cheatsheet -->
      <div class="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 text-[11px] font-mono text-zinc-400 mt-6 shadow-inner">
        <span class="text-zinc-200 font-bold block mb-1.5">⚡ Keyboard Shortcuts</span>
        <div class="space-y-1.5 text-zinc-400">
          <div><kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">S</kbd> or <kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">↑</kbd> Select</div>
          <div><kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">R</kbd> or <kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">↓</kbd> Reject</div>
          <div><kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">C</kbd> Add / Edit Caption</div>
          <div><kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">←</kbd> / <kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">→</kbd> Prev / Next</div>
          <div><kbd class="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">Space</kbd> Fullscreen Preview</div>
        </div>
      </div>
    </aside>

    <!-- Main Content Gallery / Grid -->
    <main class="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-6" id="gallery-container">
      
      <!-- Top Sub-Header & Bulk Actions -->
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
        <div>
          <h2 class="text-xl font-bold text-white tracking-tight flex items-center space-x-2" id="current-folder-title">
            <span>Day 1</span>
          </h2>
          <p class="text-xs text-zinc-400 font-mono mt-0.5" id="folder-item-count">Loading items...</p>
        </div>

        <div class="flex items-center space-x-2">
          <button onclick="bulkAction('select_all')" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 transition cursor-pointer">✓ Select Visible</button>
          <button onclick="bulkAction('reset_all')" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer">Reset Visible</button>
        </div>
      </div>

      <!-- Photo Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" id="photo-grid">
        <!-- Grid cards rendered via JS -->
      </div>
    </main>
  </div>

  <!-- Fullscreen Modal Viewer with Caption Editing -->
  <div id="lightbox-modal" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden flex flex-col justify-between p-4" onclick="closeLightbox(event)">
    <div class="flex items-center justify-between text-white font-mono text-xs px-2">
      <div id="lightbox-title">Photo Title</div>
      <div class="flex items-center space-x-3">
        <span class="text-zinc-500">Press ESC or click outside to close</span>
        <button onclick="closeLightbox()" class="p-1 text-zinc-400 hover:text-white text-lg font-bold">✕</button>
      </div>
    </div>

    <!-- Media Area -->
    <div class="flex-1 flex items-center justify-center my-2 relative overflow-hidden" onclick="event.stopPropagation()">
      <img id="lightbox-img" class="max-h-[68vh] max-w-[88vw] object-contain rounded-lg shadow-2xl" src="" />
      <video id="lightbox-video" class="max-h-[68vh] max-w-[88vw] object-contain rounded-lg shadow-2xl hidden" controls autoplay></video>
      
      <!-- Nav arrows -->
      <button onclick="prevItem()" class="absolute left-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-emerald-500 hover:text-black transition cursor-pointer">←</button>
      <button onclick="nextItem()" class="absolute right-4 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-emerald-500 hover:text-black transition cursor-pointer">→</button>
    </div>

    <!-- Caption / Story Input Area -->
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

    <!-- Lightbox Bottom Decision Bar -->
    <div class="flex items-center justify-center space-x-4 py-2" onclick="event.stopPropagation()">
      <button onclick="decideCurrent('selected')" class="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition cursor-pointer">
        <span>✓ Select (S)</span>
      </button>
      <button onclick="decideCurrent('none')" class="px-4 py-2 rounded-xl text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer">
        <span>Reset</span>
      </button>
      <button onclick="decideCurrent('rejected')" class="px-6 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 flex items-center space-x-2 transition cursor-pointer">
        <span>✕ Reject (R)</span>
      </button>
    </div>
  </div>

  <script>
    let folders = [];
    let state = { selected: {}, rejected: {}, captions: {} };
    let currentFolder = 'day1';
    let currentItems = [];
    let activeIndex = 0;
    let currentFilter = 'all';

    async function init() {
      const res = await fetch('/api/folders');
      const data = await res.json();
      folders = data.folders;
      state = data.state;
      if (!state.captions) state.captions = {};
      renderFolders();
      loadFolder('day1');
      updateGlobalCounters();
    }

    function renderFolders() {
      const list = document.getElementById('folder-list');
      list.innerHTML = folders.map(f => `
        <button onclick="loadFolder('${f.id}')" id="folder-btn-${f.id.replace('/', '-')}" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${currentFolder === f.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}">
          <span class="truncate">${f.label}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400">${f.count}</span>
        </button>
      `).join('');
    }

    async function loadFolder(folderId) {
      currentFolder = folderId;
      document.querySelectorAll('[id^="folder-btn-"]').forEach(el => {
        el.className = el.className.replace('bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold', 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60');
      });
      const activeBtn = document.getElementById('folder-btn-' + folderId.replace('/', '-'));
      if (activeBtn) {
        activeBtn.className = 'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold';
      }

      document.getElementById('current-folder-title').innerHTML = `<span>${folders.find(f => f.id === folderId)?.label || folderId}</span>`;
      
      const res = await fetch('/api/items?folder=' + encodeURIComponent(folderId));
      const data = await res.json();
      currentItems = data.items;
      renderGrid();
    }

    function setFilter(filter) {
      currentFilter = filter;
      ['all', 'unreviewed', 'selected', 'captioned', 'rejected'].forEach(f => {
        const btn = document.getElementById('filter-' + f);
        if (btn) {
          if (f === filter) {
            btn.className = 'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition bg-zinc-800 text-white font-bold cursor-pointer';
          } else {
            btn.className = 'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer';
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
        if (currentFilter === 'selected') return isSel;
        if (currentFilter === 'rejected') return isRej;
        if (currentFilter === 'captioned') return hasCap;
        if (currentFilter === 'unreviewed') return !isSel && !isRej;
        return true;
      });
    }

    function renderGrid() {
      const filtered = getFilteredItems();
      document.getElementById('folder-item-count').innerText = `${filtered.length} visible of ${currentItems.length} items`;
      
      const grid = document.getElementById('photo-grid');
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-zinc-500 font-mono text-sm">No photos match this filter.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((item, idx) => {
        const isSel = !!state.selected[item.id];
        const isRej = !!state.rejected[item.id];
        const caption = state.captions[item.id] || '';
        return `
          <div class="group relative rounded-xl overflow-hidden border transition-all duration-200 bg-zinc-900/60 flex flex-col justify-between ${isSel ? 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/40' : isRej ? 'border-rose-900/60 opacity-40' : 'border-zinc-800/80 hover:border-zinc-700'}" id="card-${idx}">
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
              
              <!-- Badges -->
              <div class="absolute top-2 left-2 flex items-center space-x-1">
                ${isSel ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-zinc-950 shadow">✓ SELECTED</span>' : isRej ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white shadow">✕ REJECTED</span>' : ''}
                ${caption ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-zinc-950 shadow">💬 NOTE</span>' : ''}
              </div>
            </div>

            <!-- Inline Caption / Story Area -->
            <div class="p-2.5 bg-zinc-900/90 border-t border-zinc-800/60">
              <div class="flex items-center space-x-1.5 mb-1.5">
                <input 
                  type="text" 
                  value="${escapeHtml(caption)}" 
                  placeholder="Click to add note / caption..." 
                  onblur="saveInlineCaption('${item.id}', this.value)"
                  onkeydown="if(event.key === 'Enter') { this.blur(); }"
                  class="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-400/70 rounded-lg px-2 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none font-sans"
                />
              </div>

              <!-- Buttons -->
              <div class="flex items-center justify-between text-xs pt-1">
                <button onclick="setDecision('${item.id}', '${isSel ? 'none' : 'selected'}')" class="flex-1 py-1 text-center font-bold font-mono text-[11px] rounded transition cursor-pointer ${isSel ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10'}">
                  ✓ Select
                </button>
                <div class="w-px h-4 bg-zinc-800 mx-1"></div>
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

    async function setDecision(itemId, decision) {
      if (decision === 'selected') {
        state.selected[itemId] = true;
        delete state.rejected[itemId];
      } else if (decision === 'rejected') {
        state.rejected[itemId] = true;
        delete state.selected[itemId];
      } else {
        delete state.selected[itemId];
        delete state.rejected[itemId];
      }
      
      updateGlobalCounters();
      renderGrid();

      fetch('/api/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, decision })
      });
    }

    async function saveInlineCaption(itemId, caption) {
      caption = caption.trim();
      if (caption) {
        state.captions[itemId] = caption;
      } else {
        delete state.captions[itemId];
      }
      updateGlobalCounters();
      fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, caption })
      });
    }

    function updateGlobalCounters() {
      const selCount = Object.keys(state.selected).length;
      const rejCount = Object.keys(state.rejected).length;
      const capCount = Object.keys(state.captions).length;
      const totalAll = folders.reduce((sum, f) => sum + f.count, 0);
      document.getElementById('selected-counter').innerText = `✓ ${selCount} Selected`;
      document.getElementById('rejected-counter').innerText = `✕ ${rejCount} Rejected`;
      document.getElementById('captioned-counter').innerText = `💬 ${capCount} Captioned`;
      document.getElementById('total-counter').innerText = `${totalAll} Total`;
    }

    function openLightbox(idx) {
      activeIndex = idx;
      const filtered = getFilteredItems();
      const item = filtered[idx];
      if (!item) return;

      document.getElementById('lightbox-title').innerText = `${item.name} (${idx + 1} of ${filtered.length})`;
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
      if (activeIndex > 0) {
        openLightbox(activeIndex - 1);
      } else {
        openLightbox(filtered.length - 1);
      }
    }

    function nextItem() {
      const filtered = getFilteredItems();
      if (activeIndex < filtered.length - 1) {
        openLightbox(activeIndex + 1);
      } else {
        openLightbox(0);
      }
    }

    function decideCurrent(decision) {
      const filtered = getFilteredItems();
      const item = filtered[activeIndex];
      if (item) {
        setDecision(item.id, decision);
        nextItem();
      }
    }

    function handleCaptionKey(e) {
      if (e.key === 'Enter') {
        saveLightboxCaption();
      }
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

      if (isTyping) {
        return; // don't trigger shortcuts while typing a caption!
      }

      if (e.key === 'ArrowRight') {
        if (isModalOpen) nextItem();
      } else if (e.key === 'ArrowLeft') {
        if (isModalOpen) prevItem();
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
      if (selCount === 0) {
        alert('No photos selected yet! Select some photos first.');
        return;
      }
      if (!confirm(`Export ${selCount} selected photos and notes to taiwan-photos/curated_selected/?`)) return;

      const res = await fetch('/api/export', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully copied ${data.copied} selected media files + CURATED_CAPTIONS.json to:\n${data.target}`);
      }
    }

    async function bulkAction(action) {
      const filtered = getFilteredItems();
      if (action === 'select_all') {
        filtered.forEach(it => state.selected[it.id] = true);
      } else if (action === 'reset_all') {
        filtered.forEach(it => {
          delete state.selected[it.id];
          delete state.rejected[it.id];
        });
      }
      updateGlobalCounters();
      renderGrid();
      for (const it of filtered) {
        const dec = state.selected[it.id] ? 'selected' : 'none';
        fetch('/api/decide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: it.id, decision: dec })
        });
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
        print(f'Starting Taiwan Photo Curator & Captioner at http://localhost:{PORT}...')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down server.')
