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

  // Fix Lucide imports deduplication
  content = content.replace(/import \{([\s\S]*?)\} from 'lucide-react'/g, (match, p1) => {
    const icons = p1.split(',').map(i => i.trim()).filter(i => i !== '');
    const uniqueIcons = [...new Set(icons)];
    return `import {\n  ${uniqueIcons.join(',\n  ')}\n} from 'lucide-react'`;
  });

  // Fix colors undefined in ANY file (batch fix)
  if (content.includes('}[severity];') && content.includes('const colors = {')) {
     content = content.replace(/const colors = \{([\s\S]*?)\}\[severity\];/g, (match, p1) => {
       return `const colors = (({${p1}} as const)[severity as 'high' | 'medium']) || { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-600', text: 'text-slate-800', label: 'Note' };`;
     });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Deduplicated/Fixed: ${filePath}`);
  }
});
