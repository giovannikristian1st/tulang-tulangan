const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// 1. Prepare i18n dictionary and language helper code
const i18nCode = `
    /* ==========================================================================
       MULTI-LANGUAGE LOCALIZATION (IDN, ENG, CHINESE)
       ========================================================================== */
    let currentLang = (function() {
      try {
        return localStorage.getItem('skeleton_lang_preference') || 'id';
      } catch(e) {
        return 'id';
      }
    })();

    const i18n = {
      id: {
        appTitle: "Anatomi 206 Tulang Manusia 3D",
        appSubtitle: "Visual Rangka Tubuh Asli • Standar Medis",
        btnSidebar: "Indeks Tulang",
        themeMode: "Mode",
        themeLight: "Terang",
        themeDark: "Gelap",
        autoRotate: "Rotasi",
        btnReset: "Reset Kamera",
        sidebarHeading: "Indeks Tulang",
        searchPlaceholder: "Cari nama tulang (Indonesia / Latin / English / 中文)...",
        filterAll: "Semua (206)",
        filterAxial: "Aksial (80)",
        filterAppendicular: "Apendikular (126)",
        bonesSuffix: "Tulang",
        btnAudio: "Lafalkan",
        btnFocus: "Fokuskan Pandangan",
        btnFocusActive: "Tampilkan Seluruh Tulang",
        titleFocus: "Isolasi tulang ini dan sembunyikan tulang lain",
        titleFocusActive: "Klik untuk membatalkan isolasi & tampilkan seluruh rangka tubuh",
        winDescLabel: "Fungsi Utama",
        winFunFactLabel: "CATATAN MEDIS & ANATOMI",
        hintDrag: "Rotasi 360°",
        hintZoom: "Zoom In / Out",
        hintClickKbd: "Klik Tulang",
        hintClickText: "Pilih & Sorot Spesimen",
        loadingTitle: "Memuat Anatomi 3D Rangka Asli Manusia",
        loadingDesc: "Menyiapkan 206 elemen tulang manusia berpresisi tinggi...",
        speechLang: "id-ID",
        speechFormat: (bone) => \`\${bone.nameId}. Dalam bahasa Latin, \${bone.nameLatin}.\`
      },
      en: {
        appTitle: "3D Human Skeleton Anatomy",
        appSubtitle: "Real Skeletal Anatomy • Medical Standards",
        btnSidebar: "Bone Index",
        themeMode: "Mode",
        themeLight: "Light",
        themeDark: "Dark",
        autoRotate: "Rotate",
        btnReset: "Reset Camera",
        sidebarHeading: "Bone Index",
        searchPlaceholder: "Search bone (English / Latin / Indonesian / 中文)...",
        filterAll: "All (206)",
        filterAxial: "Axial (80)",
        filterAppendicular: "Appendicular (126)",
        bonesSuffix: "Bones",
        btnAudio: "Pronounce",
        btnFocus: "Focus View",
        btnFocusActive: "Show Full Skeleton",
        titleFocus: "Isolate this bone and hide all other bones",
        titleFocusActive: "Click to exit isolation & show full skeleton",
        winDescLabel: "Main Function",
        winFunFactLabel: "CLINICAL & ANATOMICAL NOTES",
        hintDrag: "360° Rotation",
        hintZoom: "Zoom In / Out",
        hintClickKbd: "Click Bone",
        hintClickText: "Select & Highlight Specimen",
        loadingTitle: "Loading 3D Real Human Skeleton",
        loadingDesc: "Preparing 206 high-precision human bone elements...",
        speechLang: "en-US",
        speechFormat: (bone) => \`\${bone.nameEn || bone.nameId}. In Latin, \${bone.nameLatin}.\`
      },
      zh: {
        appTitle: "3D 人体骨骼解剖学",
        appSubtitle: "真实人体骨骼标本 • 国际医学标准",
        btnSidebar: "骨骼索引",
        themeMode: "模式",
        themeLight: "浅色",
        themeDark: "深色",
        autoRotate: "自动旋转",
        btnReset: "重置视角",
        sidebarHeading: "骨骼索引",
        searchPlaceholder: "搜索骨骼 (中文 / 拉丁文 / English / 印尼文)...",
        filterAll: "全部 (206)",
        filterAxial: "中轴骨 (80)",
        filterAppendicular: "附肢骨 (126)",
        bonesSuffix: "块骨",
        btnAudio: "语音发音",
        btnFocus: "聚焦并单独观察",
        btnFocusActive: "显示全部骨骼",
        titleFocus: "单独观察此骨骼并隐藏其他骨骼",
        titleFocusActive: "点击取消隔离并恢复显示全部骨骼",
        winDescLabel: "解剖功能与生理特征",
        winFunFactLabel: "临床要点与医学特征",
        hintDrag: "360° 旋转视角",
        hintZoom: "缩放视图",
        hintClickKbd: "点击骨骼",
        hintClickText: "选中并高亮标本",
        loadingTitle: "正在载入真实人体骨骼 3D 模型",
        loadingDesc: "正在准备206块高精度人体骨骼解剖结构...",
        speechLang: "zh-CN",
        speechFormat: (bone) => \`\${bone.nameZh || bone.nameId}。拉丁学名：\${bone.nameLatin}。\`
      }
    };

    function getBoneName(bone, lang = currentLang) {
      if (lang === 'en') return bone.nameEn || bone.nameId;
      if (lang === 'zh') return bone.nameZh || bone.nameId;
      return bone.nameId;
    }

    function getBoneDesc(bone, lang = currentLang) {
      if (lang === 'en') return bone.descEn || bone.desc;
      if (lang === 'zh') return bone.descZh || bone.desc;
      return bone.desc;
    }

    function getBoneFunFact(bone, lang = currentLang) {
      if (lang === 'en') return bone.funFactEn || bone.funFact;
      if (lang === 'zh') return bone.funFactZh || bone.funFact;
      return bone.funFact;
    }

    function getRegionLabel(reg, lang = currentLang) {
      if (lang === 'en') return reg.labelEn || reg.labelId || reg.label;
      if (lang === 'zh') return reg.labelZh || reg.labelId || reg.label;
      return reg.labelId || reg.label;
    }

    function getGroupLabel(group, lang = currentLang) {
      if (group === 'axial') {
        if (lang === 'en') return 'Axial Skeleton';
        if (lang === 'zh') return '中轴骨骼';
        return 'Rangka Aksial';
      } else {
        if (lang === 'en') return 'Appendicular Skeleton';
        if (lang === 'zh') return '附肢骨骼';
        return 'Rangka Apendikular';
      }
    }

    function setLanguage(lang) {
      if (!i18n[lang]) lang = 'id';
      currentLang = lang;

      try {
        localStorage.setItem('skeleton_lang_preference', lang);
      } catch(e) {}

      // Update HTML lang attribute
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : (lang === 'en' ? 'en' : 'id');

      // Update active pill button
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      });

      const t = i18n[lang];

      // Update Header UI
      const appHeaderTitle = document.getElementById('appHeaderTitle');
      if (appHeaderTitle) appHeaderTitle.innerText = t.appTitle;

      const appHeaderSubtitle = document.getElementById('appHeaderSubtitle');
      if (appHeaderSubtitle) appHeaderSubtitle.innerText = t.appSubtitle;

      const btnSidebarText = document.getElementById('btnSidebarText');
      if (btnSidebarText) btnSidebarText.innerText = t.btnSidebar;

      const themeModeWord = document.getElementById('themeModeWord');
      if (themeModeWord) themeModeWord.innerText = t.themeMode;

      const themeStateWord = document.getElementById('themeStateWord');
      if (themeStateWord) themeStateWord.innerText = isDarkMode ? t.themeDark : t.themeLight;

      const autoRotateText = document.getElementById('autoRotateText');
      if (autoRotateText) autoRotateText.innerText = t.autoRotate;

      const btnResetText = document.getElementById('btnResetText');
      if (btnResetText) btnResetText.innerText = t.btnReset;

      // Update Sidebar UI
      const sidebarHeading = document.getElementById('sidebarHeading');
      if (sidebarHeading) sidebarHeading.innerText = t.sidebarHeading;

      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.placeholder = t.searchPlaceholder;

      const tabFilterAll = document.getElementById('tabFilterAll');
      if (tabFilterAll) tabFilterAll.innerText = t.filterAll;

      const tabFilterAxial = document.getElementById('tabFilterAxial');
      if (tabFilterAxial) tabFilterAxial.innerText = t.filterAxial;

      const tabFilterAppendicular = document.getElementById('tabFilterAppendicular');
      if (tabFilterAppendicular) tabFilterAppendicular.innerText = t.filterAppendicular;

      // Update Window Details Labels
      const winDescLabel = document.getElementById('winDescLabel');
      if (winDescLabel) winDescLabel.innerText = t.winDescLabel;

      const btnAudioText = document.getElementById('btnAudioText');
      if (btnAudioText) btnAudioText.innerText = t.btnAudio;

      // Update Hints
      const hintDragText = document.getElementById('hintDragText');
      if (hintDragText) hintDragText.innerText = t.hintDrag;

      const hintZoomText = document.getElementById('hintZoomText');
      if (hintZoomText) hintZoomText.innerText = t.hintZoom;

      const hintClickKbd = document.getElementById('hintClickKbd');
      if (hintClickKbd) hintClickKbd.innerText = t.hintClickKbd;

      const hintClickText = document.getElementById('hintClickText');
      if (hintClickText) hintClickText.innerText = t.hintClickText;

      // Re-render sidebar and active detail window if bone selected
      renderSidebar();

      if (activeBoneId) {
        selectBone(activeBoneId);
      } else {
        updateFocusToggleButton();
      }
    }
`;

// Insert i18nCode right before "function toggleTheme()"
if (!content.includes('const i18n = {')) {
  content = content.replace('function toggleTheme() {', i18nCode + '\n    function toggleTheme() {');
}

// 2. Update setTheme to use localized Mode & State
const oldSetTheme = `      // Update button text & icon
      const themeLabel = document.getElementById('themeLabel');
      const themeIcon = document.getElementById('themeIcon');
      if (themeLabel) themeLabel.innerHTML = \`Mode: <b>\${isDarkMode ? 'Gelap' : 'Terang'}</b>\`;`;

const newSetTheme = `      // Update button text & icon
      const themeLabel = document.getElementById('themeLabel');
      const themeIcon = document.getElementById('themeIcon');
      const t = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : null;
      const modeWord = t ? t.themeMode : 'Mode';
      const stateWord = isDarkMode ? (t ? t.themeDark : 'Gelap') : (t ? t.themeLight : 'Terang');
      if (themeLabel) themeLabel.innerHTML = \`<span id="themeModeWord">\${modeWord}</span>: <b><span id="themeStateWord">\${stateWord}</span></b>\`;`;

if (content.includes(oldSetTheme)) {
  content = content.replace(oldSetTheme, newSetTheme);
}

// 3. Update updateFocusToggleButton
const oldFocusBtn = `    function updateFocusToggleButton() {
      const btn = document.getElementById('btnFocusToggle');
      const icon = document.getElementById('btnFocusIcon');
      const text = document.getElementById('btnFocusText');
      if (!btn || !text) return;

      if (isIsolatedFocus) {
        btn.classList.add('active');
        btn.setAttribute('title', 'Klik untuk membatalkan isolasi & tampilkan seluruh rangka tubuh');
        text.innerText = 'Tampilkan Seluruh Tulang';
        if (icon) {
          icon.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\`;
        }
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', 'Isolasi tulang ini dan sembunyikan tulang lain');
        text.innerText = 'Fokuskan Pandangan';
        if (icon) {
          icon.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>\`;
        }
      }
    }`;

const newFocusBtn = `    function updateFocusToggleButton() {
      const btn = document.getElementById('btnFocusToggle');
      const icon = document.getElementById('btnFocusIcon');
      const text = document.getElementById('btnFocusText');
      if (!btn || !text) return;

      const t = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : (i18n ? i18n.id : null);

      if (isIsolatedFocus) {
        btn.classList.add('active');
        btn.setAttribute('title', t ? t.titleFocusActive : 'Klik untuk membatalkan isolasi & tampilkan seluruh rangka tubuh');
        text.innerText = t ? t.btnFocusActive : 'Tampilkan Seluruh Tulang';
        if (icon) {
          icon.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\`;
        }
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', t ? t.titleFocus : 'Isolasi tulang ini dan sembunyikan tulang lain');
        text.innerText = t ? t.btnFocus : 'Fokuskan Pandangan';
        if (icon) {
          icon.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>\`;
        }
      }
    }`;

if (content.includes(oldFocusBtn)) {
  content = content.replace(oldFocusBtn, newFocusBtn);
}

// 4. Update selectBone
const oldSelectBoneWin = `      // Update Right Detail Window
      document.getElementById('winBoneName').innerText = bone.nameId;
      document.getElementById('winBoneLatin').innerText = bone.nameLatin;
      document.getElementById('winBoneDesc').innerText = bone.desc;
      document.getElementById('winFunFact').innerHTML = \`
        <div class="funfact-label">CATATAN MEDIS & ANATOMI</div>
        <div class="funfact-text">\${bone.funFact}</div>
      \`;
      document.getElementById('winCountTag').innerText = \`\${bone.count} Tulang\`;
      document.getElementById('winRegionTag').innerText = bone.regionLabel;

      const groupTag = document.getElementById('winGroupTag');
      groupTag.innerText = bone.groupLabel;
      groupTag.className = 'tag-badge ' + (bone.group === 'axial' ? 'tag-group-axial' : 'tag-group-appendicular');`;

const newSelectBoneWin = `      // Update Right Detail Window
      const t = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : (i18n ? i18n.id : null);
      const regDef = regionDefinitions.find(r => r.id === bone.regionId);
      const regLabel = regDef ? getRegionLabel(regDef, currentLang) : (bone.regionLabel || '');
      const grpLabel = getGroupLabel(bone.group, currentLang);

      document.getElementById('winBoneName').innerText = getBoneName(bone, currentLang);
      document.getElementById('winBoneLatin').innerText = bone.nameLatin;
      document.getElementById('winBoneDesc').innerText = getBoneDesc(bone, currentLang);
      document.getElementById('winFunFact').innerHTML = \`
        <div class="funfact-label">\${t ? t.winFunFactLabel : 'CATATAN MEDIS & ANATOMI'}</div>
        <div class="funfact-text">\${getBoneFunFact(bone, currentLang)}</div>
      \`;
      document.getElementById('winCountTag').innerText = \`\${bone.count} \${t ? t.bonesSuffix : 'Tulang'}\`;
      document.getElementById('winRegionTag').innerText = regLabel;

      const groupTag = document.getElementById('winGroupTag');
      groupTag.innerText = grpLabel;
      groupTag.className = 'tag-badge ' + (bone.group === 'axial' ? 'tag-group-axial' : 'tag-group-appendicular');`;

if (content.includes(oldSelectBoneWin)) {
  content = content.replace(oldSelectBoneWin, newSelectBoneWin);
}

// 5. Update speakBoneName
const oldSpeak = `    // Text-to-Speech Voice Pronunciation
    function speakBoneName() {
      if (!activeBoneId) return;
      const bone = skeletonData.find(b => b.id === activeBoneId);
      if (!bone) return;

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = \`\${bone.nameId}. Dalam bahasa Latin, \${bone.nameLatin}.\`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'id-ID';
        utterance.rate = 0.92;
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Browser Anda belum mendukung Web Speech API.");
      }
    }`;

const newSpeak = `    // Text-to-Speech Voice Pronunciation
    function speakBoneName() {
      if (!activeBoneId) return;
      const bone = skeletonData.find(b => b.id === activeBoneId);
      if (!bone) return;

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const t = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : (i18n ? i18n.id : null);
        const textToSpeak = (t && typeof t.speechFormat === 'function')
          ? t.speechFormat(bone)
          : \`\${getBoneName(bone, currentLang)}. \${bone.nameLatin}.\`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = t ? t.speechLang : 'id-ID';
        utterance.rate = 0.92;
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Browser Anda belum mendukung Web Speech API.");
      }
    }`;

if (content.includes(oldSpeak)) {
  content = content.replace(oldSpeak, newSpeak);
}

// 6. Update regionDefinitions
const oldRegionDefs = `    const regionDefinitions = [
      { id: "cranium", label: "Tengkorak (Kranium)", group: "axial" },
      { id: "facial", label: "Tulang Wajah", group: "axial" },
      { id: "ossicles", label: "Tulang Pendengaran", group: "axial" },
      { id: "hyoid", label: "Tulang Leher & Lidah", group: "axial" },
      { id: "spine", label: "Tulang Belakang (Vertebrae)", group: "axial" },
      { id: "ribcage", label: "Dada & Rusuk (Toraks)", group: "axial" },
      { id: "shoulder", label: "Gelang Bahu (Pektoral)", group: "appendicular" },
      { id: "arms", label: "Lengan Atas & Bawah", group: "appendicular" },
      { id: "hands", label: "Pergelangan & Jari Tangan", group: "appendicular" },
      { id: "pelvis", label: "Gelang Panggul (Pelvis)", group: "appendicular" },
      { id: "legs", label: "Tungkai Bawah", group: "appendicular" },
      { id: "feet", label: "Pergelangan & Jari Kaki", group: "appendicular" }
    ];`;

const newRegionDefs = `    const regionDefinitions = [
      { id: "cranium", labelId: "Tengkorak (Kranium)", labelEn: "Cranium (Skull)", labelZh: "脑颅骨", group: "axial" },
      { id: "facial", labelId: "Tulang Wajah", labelEn: "Facial Bones", labelZh: "面颅骨", group: "axial" },
      { id: "ossicles", labelId: "Tulang Pendengaran", labelEn: "Auditory Ossicles", labelZh: "听小骨", group: "axial" },
      { id: "hyoid", labelId: "Tulang Leher & Lidah", labelEn: "Hyoid Bone", labelZh: "舌骨", group: "axial" },
      { id: "spine", labelId: "Tulang Belakang (Vertebrae)", labelEn: "Vertebral Column", labelZh: "脊柱 (椎骨)", group: "axial" },
      { id: "ribcage", labelId: "Dada & Rusuk (Toraks)", labelEn: "Thoracic Cage & Ribs", labelZh: "胸廓与肋骨", group: "axial" },
      { id: "shoulder", labelId: "Gelang Bahu (Pektoral)", labelEn: "Shoulder Girdle (Pectoral)", labelZh: "肩带骨 (上肢带骨)", group: "appendicular" },
      { id: "arms", labelId: "Lengan Atas & Bawah", labelEn: "Upper & Lower Arms", labelZh: "上臂与前臂骨", group: "appendicular" },
      { id: "hands", labelId: "Pergelangan & Jari Tangan", labelEn: "Wrists & Hands", labelZh: "手部骨 (腕掌指骨)", group: "appendicular" },
      { id: "pelvis", labelId: "Gelang Panggul (Pelvis)", labelEn: "Pelvic Girdle (Pelvis)", labelZh: "骨盆 (下肢带骨)", group: "appendicular" },
      { id: "legs", labelId: "Tungkai Bawah", labelEn: "Lower Limbs & Legs", labelZh: "下肢骨 (股骨胫骨腓骨)", group: "appendicular" },
      { id: "feet", labelId: "Pergelangan & Jari Kaki", labelEn: "Ankles & Feet", labelZh: "足部骨 (跗跖趾骨)", group: "appendicular" }
    ];`;

if (content.includes(oldRegionDefs)) {
  content = content.replace(oldRegionDefs, newRegionDefs);
}

// 7. Update renderSidebar
const oldRenderSidebar = `    function renderSidebar() {
      const container = document.getElementById('bonesAccordionContainer');
      container.innerHTML = '';

      let totalVisibleBones = 0;

      regionDefinitions.forEach(reg => {
        // Filter by category tab
        if (currentFilter !== 'all' && reg.group !== currentFilter) {
          return;
        }

        // Filter items by search query
        const itemsInRegion = skeletonData.filter(b => {
          if (b.regionId !== reg.id) return false;
          if (!currentSearchQuery) return true;
          const q = currentSearchQuery.toLowerCase();
          return b.nameId.toLowerCase().includes(q) || b.nameLatin.toLowerCase().includes(q);
        });

        if (itemsInRegion.length === 0) return;

        const regionBoneCount = itemsInRegion.reduce((sum, item) => sum + item.count, 0);
        totalVisibleBones += regionBoneCount;

        const groupDiv = document.createElement('div');
        groupDiv.className = 'region-group' + (currentSearchQuery ? ' expanded' : '');
        groupDiv.id = \`reg-\${reg.id}\`;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'region-header';
        headerDiv.onclick = () => groupDiv.classList.toggle('expanded');
        headerDiv.innerHTML = \`
          <div class="region-left">
            <span class="region-chevron">▸</span>
            <span class="region-title">\${reg.label}</span>
          </div>
          <span class="region-count">\${regionBoneCount}</span>
        \`;

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'region-items';

        itemsInRegion.forEach(item => {
          const btn = document.createElement('div');
          btn.className = 'bone-list-item' + (activeBoneId === item.id ? ' active' : '');
          btn.id = \`item-\${item.id}\`;
          btn.onclick = () => selectBone(item.id);
          btn.innerHTML = \`
            <div class="bone-item-names">
              <span class="bone-name-id">\${item.nameId}</span>
              <span class="bone-name-latin">\${item.nameLatin}</span>
            </div>
            <span class="bone-item-badge">\${item.count}</span>
          \`;
          itemsContainer.appendChild(btn);
        });

        groupDiv.appendChild(headerDiv);
        groupDiv.appendChild(itemsContainer);
        container.appendChild(groupDiv);
      });

      document.getElementById('boneCountBadge').innerText = \`\${totalVisibleBones} Tulang\`;
    }`;

const newRenderSidebar = `    function renderSidebar() {
      const container = document.getElementById('bonesAccordionContainer');
      container.innerHTML = '';

      let totalVisibleBones = 0;
      const t = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : (i18n ? i18n.id : null);

      regionDefinitions.forEach(reg => {
        // Filter by category tab
        if (currentFilter !== 'all' && reg.group !== currentFilter) {
          return;
        }

        // Filter items by multi-lingual search query across ID, EN, ZH, and Latin
        const itemsInRegion = skeletonData.filter(b => {
          if (b.regionId !== reg.id) return false;
          if (!currentSearchQuery) return true;
          const q = currentSearchQuery.toLowerCase();
          return (b.nameId && b.nameId.toLowerCase().includes(q)) ||
                 (b.nameEn && b.nameEn.toLowerCase().includes(q)) ||
                 (b.nameZh && b.nameZh.toLowerCase().includes(q)) ||
                 (b.nameLatin && b.nameLatin.toLowerCase().includes(q));
        });

        if (itemsInRegion.length === 0) return;

        const regionBoneCount = itemsInRegion.reduce((sum, item) => sum + item.count, 0);
        totalVisibleBones += regionBoneCount;

        const groupDiv = document.createElement('div');
        groupDiv.className = 'region-group' + (currentSearchQuery ? ' expanded' : '');
        groupDiv.id = \`reg-\${reg.id}\`;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'region-header';
        headerDiv.onclick = () => groupDiv.classList.toggle('expanded');
        const regLabel = getRegionLabel(reg, currentLang);
        headerDiv.innerHTML = \`
          <div class="region-left">
            <span class="region-chevron">▸</span>
            <span class="region-title">\${regLabel}</span>
          </div>
          <span class="region-count">\${regionBoneCount}</span>
        \`;

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'region-items';

        itemsInRegion.forEach(item => {
          const btn = document.createElement('div');
          btn.className = 'bone-list-item' + (activeBoneId === item.id ? ' active' : '');
          btn.id = \`item-\${item.id}\`;
          btn.onclick = () => selectBone(item.id);
          const displayedName = getBoneName(item, currentLang);
          btn.innerHTML = \`
            <div class="bone-item-names">
              <span class="bone-name-id">\${displayedName}</span>
              <span class="bone-name-latin">\${item.nameLatin}</span>
            </div>
            <span class="bone-item-badge">\${item.count}</span>
          \`;
          itemsContainer.appendChild(btn);
        });

        groupDiv.appendChild(headerDiv);
        groupDiv.appendChild(itemsContainer);
        container.appendChild(groupDiv);
      });

      const badge = document.getElementById('boneCountBadge');
      if (badge) badge.innerText = \`\${totalVisibleBones} \${t ? t.bonesSuffix : 'Tulang'}\`;
    }`;

if (content.includes(oldRenderSidebar)) {
  content = content.replace(oldRenderSidebar, newRenderSidebar);
}

// 8. Update initial theme and language preferences
const oldInit = `    // Initialize Theme Preference (Default: Light Mode)
    const savedTheme = (function() {
      try {
        return localStorage.getItem('bone_theme_preference') || 'light';
      } catch(e) {
        return 'light';
      }
    })();
    setTheme(savedTheme);`;

const newInit = `    // Initialize Language & Theme Preference (Default: IDN, Light Mode)
    const savedLang = (function() {
      try {
        return localStorage.getItem('skeleton_lang_preference') || 'id';
      } catch(e) {
        return 'id';
      }
    })();
    setLanguage(savedLang);

    const savedTheme = (function() {
      try {
        return localStorage.getItem('bone_theme_preference') || 'light';
      } catch(e) {
        return 'light';
      }
    })();
    setTheme(savedTheme);`;

if (content.includes(oldInit)) {
  content = content.replace(oldInit, newInit);
}

fs.writeFileSync(indexPath, content, 'utf-8');
console.log('Successfully injected and updated i18n logic into index.html!');
