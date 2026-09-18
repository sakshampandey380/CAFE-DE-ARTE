const fs = require('fs');
const path = require('path');

const root = __dirname;
const targets = ['dist', 'build'];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry === '.git' || entry === 'node_modules' || targets.includes(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Populate both dist/ and build/ with the static assets
for (const target of targets) {
  const targetDir = path.join(root, target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy index.html
  fs.copyFileSync(path.join(root, 'index.html'), path.join(targetDir, 'index.html'));

  // Copy css, js, assets
  copyRecursive(path.join(root, 'css'), path.join(targetDir, 'css'));
  copyRecursive(path.join(root, 'js'), path.join(targetDir, 'js'));
  copyRecursive(path.join(root, 'assets'), path.join(targetDir, 'assets'));

  console.log(`[OK] Prepared static output in '${target}/'`);
}

console.log('Static site build finished successfully.');
