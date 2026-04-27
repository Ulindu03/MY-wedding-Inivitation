const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\USER\.gemini\antigravity\brain\00a25131-0e87-4d9c-b065-64de279df3b7`;
const dst = String.raw`d:\STUFF\MY PROJECTS\invitation\images`;

fs.mkdirSync(dst, { recursive: true });

const files = [
  ['forest_background_1775150702096.png', 'forest_background.png'],
  ['floral_border_top_1775150729081.png', 'floral_border_top.png'],
  ['floral_border_bottom_1775150749325.png', 'floral_border_bottom.png'],
  ['couple_silhouette_1775150773755.png', 'couple_silhouette.png'],
  ['venue_illustration_1775150794579.png', 'venue_illustration.png'],
  ['media__1775150648223.jpg', 'save_the_date.jpg']
];

files.forEach(([s, d]) => {
  try {
    fs.copyFileSync(path.join(src, s), path.join(dst, d));
    console.log('Copied: ' + d);
  } catch (e) {
    console.log('Error copying ' + s + ': ' + e.message);
  }
});
console.log('Done!');
