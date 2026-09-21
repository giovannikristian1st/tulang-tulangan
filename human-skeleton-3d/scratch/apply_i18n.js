const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add CSS for Language Selector
const langCssTarget = `    .action-btn.active {
      background: #059669;
      border-color: #10b981;
      color: #ffffff;
    }`;

const langCssReplacement = `    .action-btn.active {
      background: #059669;
      border-color: #10b981;
      color: #ffffff;
    }

    /* Language Switcher Pill Group */
    .lang-pill-group {
      display: flex;
      background: var(--panel-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      padding: 3px;
      gap: 2px;
      box-shadow: var(--panel-shadow);
      pointer-events: auto;
    }

    .lang-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 5px 9px;
      border-radius: 8px;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 0.3px;
    }

    .lang-btn:hover {
      color: var(--text-heading);
      background: var(--item-hover);
    }

    .lang-btn.active {
      background: var(--primary);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
    }`;

if (!html.includes('.lang-pill-group')) {
  html = html.replace(langCssTarget, langCssReplacement);
}

// 2. Update Header HTML with Language Selector and translatable element IDs
const headerTarget = `      <div class="brand-text">
        <h1>Anatomi 206 Tulang Manusia 3D</h1>
        <p>Visual Rangka Tubuh Asli • Standar Medis</p>
      </div>
    </div>

    <div class="header-actions">
      <button class="action-btn sidebar-toggle-btn" id="btnToggleSidebar" onclick="toggleSidebarMenu()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>Indeks Tulang</span>
      </button>
      <button class="action-btn" id="btnThemeToggle" onclick="toggleTheme()" title="Ganti Mode Terang / Gelap">
        <span id="themeIcon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </span>
        <span id="themeLabel">Mode: <b>Terang</b></span>
      </button>
      <button class="action-btn" id="btnAutoRotate" onclick="toggleAutoRotate()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        <span>Rotasi: <b id="autoRotateLabel">ON</b></span>
      </button>
      <button class="action-btn" onclick="resetSkeletonView()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span>Reset Kamera</span>
      </button>
    </div>`;

const headerReplacement = `      <div class="brand-text">
        <h1 id="appHeaderTitle">Anatomi 206 Tulang Manusia 3D</h1>
        <p id="appHeaderSubtitle">Visual Rangka Tubuh Asli • Standar Medis</p>
      </div>
    </div>

    <div class="header-actions">
      <!-- Language Selector (ENG / CHINESE / IDN) -->
      <div class="lang-pill-group" id="langSelector">
        <button class="lang-btn active" id="langBtn-id" data-lang="id" onclick="setLanguage('id')" title="Bahasa Indonesia">IDN</button>
        <button class="lang-btn" id="langBtn-en" data-lang="en" onclick="setLanguage('en')" title="English">ENG</button>
        <button class="lang-btn" id="langBtn-zh" data-lang="zh" onclick="setLanguage('zh')" title="中文 (Chinese)">中文</button>
      </div>

      <button class="action-btn sidebar-toggle-btn" id="btnToggleSidebar" onclick="toggleSidebarMenu()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span id="btnSidebarText">Indeks Tulang</span>
      </button>
      <button class="action-btn" id="btnThemeToggle" onclick="toggleTheme()" title="Ganti Mode Terang / Gelap">
        <span id="themeIcon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </span>
        <span id="themeLabel"><span id="themeModeWord">Mode</span>: <b id="themeStateWord">Terang</b></span>
      </button>
      <button class="action-btn" id="btnAutoRotate" onclick="toggleAutoRotate()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        <span><span id="autoRotateText">Rotasi</span>: <b id="autoRotateLabel">ON</b></span>
      </button>
      <button class="action-btn" onclick="resetSkeletonView()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span id="btnResetText">Reset Kamera</span>
      </button>
    </div>`;

html = html.replace(headerTarget, headerReplacement);

// 3. Update Left Sidebar Filter tabs & Heading IDs
const sidebarTarget = `      <div class="sidebar-title-row">
        <h2>Indeks Tulang</h2>
        <span class="total-badge" id="boneCountBadge">206 Tulang</span>
      </div>

      <!-- Live Search Bar -->
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Cari nama tulang atau istilah latin..." oninput="handleSearch(this.value)">
        <span class="search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all" onclick="setFilter('all', this)">Semua (206)</button>
        <button class="filter-tab" data-filter="axial" onclick="setFilter('axial', this)">Aksial (80)</button>
        <button class="filter-tab" data-filter="appendicular" onclick="setFilter('appendicular', this)">Apendikular (126)</button>
      </div>`;

const sidebarReplacement = `      <div class="sidebar-title-row">
        <h2 id="sidebarHeading">Indeks Tulang</h2>
        <span class="total-badge" id="boneCountBadge">206 Tulang</span>
      </div>

      <!-- Live Search Bar -->
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Cari nama tulang atau istilah latin..." oninput="handleSearch(this.value)">
        <span class="search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab active" id="tabFilterAll" data-filter="all" onclick="setFilter('all', this)">Semua (206)</button>
        <button class="filter-tab" id="tabFilterAxial" data-filter="axial" onclick="setFilter('axial', this)">Aksial (80)</button>
        <button class="filter-tab" id="tabFilterAppendicular" data-filter="appendicular" onclick="setFilter('appendicular', this)">Apendikular (126)</button>
      </div>`;

html = html.replace(sidebarTarget, sidebarReplacement);

// 4. Update Right Window Details IDs
const rightWinTarget = `      <div class="window-latin">
        <span id="winBoneLatin">Femur</span>
        <button class="audio-btn" onclick="speakBoneName()" title="Dengarkan Pelafalan Audio">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <span>Lafalkan</span>
        </button>
      </div>`;

const rightWinReplacement = `      <div class="window-latin">
        <span id="winBoneLatin">Femur</span>
        <button class="audio-btn" onclick="speakBoneName()" title="Dengarkan Pelafalan Audio">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <span id="btnAudioText">Lafalkan</span>
        </button>
      </div>`;

html = html.replace(rightWinTarget, rightWinReplacement);

const winBodyTarget = `      <div>
        <div class="section-label">Fungsi Utama</div>
        <div class="desc-box" id="winBoneDesc">Deskripsi fungsi tulang bagi sistem biologis tubuh manusia.</div>
      </div>`;

const winBodyReplacement = `      <div>
        <div class="section-label" id="winDescLabel">Fungsi Utama</div>
        <div class="desc-box" id="winBoneDesc">Deskripsi fungsi tulang bagi sistem biologis tubuh manusia.</div>
      </div>`;

html = html.replace(winBodyTarget, winBodyReplacement);

// 5. Update Viewport Hint IDs
const hintTarget = `  <!-- Viewport Hint -->
  <div class="viewport-hint">
    <span class="hint-item"><kbd>Drag</kbd> Rotasi 360°</span>
    <span class="hint-sep">|</span>
    <span class="hint-item"><kbd>Scroll</kbd> Zoom</span>
    <span class="hint-sep">|</span>
    <span class="hint-item"><kbd>Klik Tulang</kbd> Sorot & Detail Medis</span>
  </div>`;

const hintReplacement = `  <!-- Viewport Hint -->
  <div class="viewport-hint">
    <span class="hint-item"><kbd>Drag</kbd> <span id="hintDragText">Rotasi 360°</span></span>
    <span class="hint-sep">|</span>
    <span class="hint-item"><kbd>Scroll</kbd> <span id="hintZoomText">Zoom</span></span>
    <span class="hint-sep">|</span>
    <span class="hint-item"><kbd id="hintClickKbd">Klik Tulang</kbd> <span id="hintClickText">Sorot & Detail Medis</span></span>
  </div>`;

html = html.replace(hintTarget, hintReplacement);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('HTML structure updated with language switcher and translatable IDs.');
