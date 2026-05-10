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
  
  // 1. Fix CodeBlocks (Surgical)
  // Children
  content = content.replace(/(<CodeBlock[\s\S]*?>)\s*\{`([\s\S]*?)`\}\s*(<\/CodeBlock>)/g, (match, open, code, close) => {
    let fixedCode = code.replace(/\$\{/g, '\\${').replace(/`/g, '\\`');
    return `${open}\n{\` ${fixedCode} \`}\n${close}`;
  });

  // Prop
  content = content.replace(/(<CodeBlock[\s\S]*?code=\{`)([\s\S]*?)(`\}[\s\S]*?\/>)/g, (match, open, code, close) => {
    let fixedCode = code.replace(/\$\{/g, '\\${').replace(/`/g, '\\`');
    return `${open}${fixedCode}${close}`;
  });

  // 2. Fix JSX Text Arrows
  // Only replace if followed by space and not inside a string (rough approximation)
  // To be safe, we only do it outside <CodeBlock>
  // But doing it globally is easier. Let's just do it for common cases.
  content = content.replace(/ -> /g, ' -&gt; ');
  content = content.replace(/ > /g, ' &gt; '); // Fix the context nesting issue too

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
});
