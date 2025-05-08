const fs = require('fs');
const path = require('path');

function fixIconsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixedContent = content.replace(
    /<([A-Z][a-zA-Z0-9]+) size=\{([^}]+)\} \/>/g,
    '{<\$1 size={$2} /> as JSX.Element}'
  );

  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      fixIconsInFile(fullPath);
    }
  });
}

// Start fixing from ./src
walkDir(path.join(__dirname, 'src'));
