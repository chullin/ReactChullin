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

  // 2. Fix specific known JSX text issues
  if (filePath.endsWith('ep21-context/page.tsx')) {
    content = content.replace(/Theme > User > Cart/g, 'Theme &gt; User &gt; Cart');
  }
  if (filePath.endsWith('ep04-event-loop/page.tsx')) {
    content = content.replace(/1 -> 4 -> 3 -> 2/g, '1 -&gt; 4 -&gt; 3 -&gt; 2');
    content = content.replace(/Start -> Inside - Start -> Global - End -> Inside - End/g, 'Start -&gt; Inside - Start -&gt; Global - End -&gt; Inside - End');
  }
  if (filePath.endsWith('ep08-devsecops/page.tsx')) {
    content = content.replace(/Settings -> Security/g, 'Settings -&gt; Security');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
});
