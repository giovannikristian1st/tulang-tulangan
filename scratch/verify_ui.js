const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const targetIds = [
  'langSelector', 'langBtn-id', 'langBtn-en', 'langBtn-zh',
  'appHeaderTitle', 'appHeaderSubtitle', 'btnSidebarText',
  'themeModeWord', 'themeStateWord', 'btnResetText',
  'sidebarHeading', 'searchInput', 'tabFilterAll', 'tabFilterAxial', 'tabFilterAppendicular',
  'boneCountBadge', 'bonesAccordionContainer',
  'winBoneName', 'winBoneLatin', 'winBoneDesc', 'winFunFact', 'winCountTag', 'winRegionTag', 'winGroupTag',
  'btnFocusToggle', 'btnFocusIcon', 'btnFocusText', 'btnAudioText',
  'hintDragText', 'hintZoomText', 'hintClickKbd', 'hintClickText'
];

let missing = [];
targetIds.forEach(id => {
  const pattern = new RegExp('id=["\']' + id + '["\']');
  if (!pattern.test(content)) {
    missing.push(id);
  }
});

if (missing.length > 0) {
  console.error('Missing element IDs in index.html:', missing);
  process.exit(1);
} else {
  console.log('All ' + targetIds.length + ' UI elements with translatable IDs successfully found in index.html!');
}
