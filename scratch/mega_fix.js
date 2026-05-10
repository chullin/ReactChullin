const fs = require('fs');
const path = require('path');

const blogRoot = path.join(process.cwd(), 'app/blog');

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

  // 1. Find all Lucide imports and merge them
  const lucideRegex = /import \{([\s\S]*?)\} from 'lucide-react';?/g;
  let matches;
  const allIcons = new Set();
  while ((matches = lucideRegex.exec(content)) !== null) {
    const icons = matches[1].split(',').map(i => i.trim()).filter(i => i !== '');
    icons.forEach(icon => allIcons.add(icon));
  }

  if (allIcons.size > 0) {
    // Remove all old lucide imports
    content = content.replace(lucideRegex, '');
    // Add merged import at the top (after 'use client')
    const mergedImport = `import {\n  ${Array.from(allIcons).join(',\n  ')}\n} from 'lucide-react';`;
    if (content.includes("'use client';")) {
      content = content.replace(/'use client';/, `'use client';\n${mergedImport}`);
    } else {
      content = mergedImport + '\n' + content;
    }
  }

  // 2. Add missing Lightbulb if needed (e.g. for ep21-context)
  if (content.includes('<Lightbulb') && !allIcons.has('Lightbulb')) {
      content = content.replace(/import \{([\s\S]*?)\} from 'lucide-react'/, (match, p1) => {
          return `import {${p1.trim()},\n  Lightbulb\n} from 'lucide-react'`;
      });
  }

  // 3. Clean up extra newlines created by deletion
  content = content.replace(/\n\n\n+/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Mega Fixed: ${filePath}`);
  }
});
