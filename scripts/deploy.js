import fs from 'fs';
import path from 'path';

const SRC_DIST = path.resolve('dist/antigravity-card.js');
const TARGET_WWW = 'X:/www/antigravity-card.js';
const TARGET_NO_ICON = 'X:/www/antigravity-no-icon-card.js';
const TARGET_WITH_ICON = 'X:/www/antigravity-with-icon-card.js';
const BACKUP_DIR = 'X:/www/backups';

function deploy() {
  if (!fs.existsSync(SRC_DIST)) {
    console.error('❌ dist/antigravity-card.js not found! Run npm run build first.');
    process.exit(1);
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // 1. Back up existing files
  if (fs.existsSync(TARGET_WWW)) {
    const backupBak = 'X:/www/antigravity-card.js.bak';
    const backupStamped = path.join(BACKUP_DIR, `antigravity-card-${timestamp}.js`);
    fs.copyFileSync(TARGET_WWW, backupBak);
    fs.copyFileSync(TARGET_WWW, backupStamped);
    console.log(`📦 Backed up previous build to: \n   - ${backupBak}\n   - ${backupStamped}`);
  }

  // 2. Deploy new bundles
  fs.copyFileSync(SRC_DIST, TARGET_WWW);
  fs.copyFileSync(SRC_DIST, TARGET_NO_ICON);
  fs.copyFileSync(SRC_DIST, TARGET_WITH_ICON);
  console.log(`🚀 Deployed freshly compiled bundle to: \n   - ${TARGET_WWW}\n   - ${TARGET_NO_ICON}\n   - ${TARGET_WITH_ICON}`);

  // 3. Update Lovelace Resources timestamp query
  const resourcesPath = 'X:/.storage/lovelace_resources';
  if (fs.existsSync(resourcesPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));
      if (data?.data?.items) {
        let updated = false;
        for (const item of data.data.items) {
          if (item.url && item.url.includes('/local/antigravity-card.js')) {
            item.url = `/local/antigravity-card.js?v=${timestamp}`;
            updated = true;
          }
          if (item.url && item.url.includes('/local/antigravity-no-icon-card.js')) {
            item.url = `/local/antigravity-no-icon-card.js?v=${timestamp}`;
            updated = true;
          }
          if (item.url && item.url.includes('/local/antigravity-with-icon-card.js')) {
            item.url = `/local/antigravity-with-icon-card.js?v=${timestamp}`;
            updated = true;
          }
        }
        if (updated) {
          fs.writeFileSync(resourcesPath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`⚡ Lovelace resources updated with cache buster: ?v=${timestamp}`);
        }
      }
    } catch (err) {
      console.warn('⚠️ Could not update lovelace_resources on disk:', err.message);
    }
  }

  console.log('✅ Deployment complete!');
}

deploy();
