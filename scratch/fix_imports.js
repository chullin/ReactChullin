const fs = require('fs');
const path = require('path');

const blogRoot = path.join(process.cwd(), 'app/blog');
const lucideIcons = ['Server', 'Layers', 'Info', 'AlertCircle', 'Database', 'Radio', 'Trophy', 'Zap', 'Shield', 'BarChart3', 'Clock', 'Calendar', 'User', 'ArrowRight', 'ArrowLeft', 'CheckCircle', 'AlertTriangle', 'BookOpen', 'Code2', 'RefreshCw'];

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allPages = getFiles(blogRoot);

allPages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  lucideIcons.forEach(icon => {
    // Check if icon is used but NOT imported
    if (content.includes(`<${icon}`) && !content.includes(`${icon},`) && !content.includes(`  ${icon}`)) {
      // Try to find lucide-react import
      if (content.includes("from 'lucide-react'")) {
        content = content.replace(/import \{([\s\S]*?)\} from 'lucide-react'/, (match, p1) => {
          if (p1.includes(icon)) return match;
          return `import {${p1.trim()},\n  ${icon}\n} from 'lucide-react'`;
        });
      }
    }
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports: ${filePath}`);
  }
});
