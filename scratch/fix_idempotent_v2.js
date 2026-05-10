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
  
  // 1. Fix CodeBlocks with children: <CodeBlock ...>{` ... `}</CodeBlock>
  content = content.replace(/(<CodeBlock[\s\S]*?>)\s*\{`([\s\S]*?)`\}\s*(<\/CodeBlock>)/g, (match, open, code, close) => {
    // Unescape first (remove any number of backslashes before $ or `)
    let cleanCode = code.replace(/\\+\$\{/g, '${').replace(/\\+`/g, '`');
    // Re-escape correctly
    let fixedCode = cleanCode.replace(/\$\{/g, '\\${').replace(/`/g, '\\`');
    return `${open}\n{\` ${fixedCode} \`}\n${close}`;
  });

  // 2. Fix CodeBlocks with code prop: <CodeBlock ... code={` ... `} ... />
  content = content.replace(/(<CodeBlock[\s\S]*?code=\{`)([\s\S]*?)(`\}[\s\S]*?\/>)/g, (match, open, code, close) => {
    // Unescape first
    let cleanCode = code.replace(/\\+\$\{/g, '${').replace(/\\+`/g, '`');
    // Re-escape correctly
    let fixedCode = cleanCode.replace(/\$\{/g, '\\${').replace(/`/g, '\\`');
    return `${open}${fixedCode}${close}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
});
