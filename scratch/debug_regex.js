const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/blog/database/ep06-redis-advanced/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const regex = /(<CodeBlock[\s\S]*?code=\{`)([\s\S]*?)(`\}[\s\S]*?\/>)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log("Found match!");
  let open = match[1];
  let code = match[2];
  let close = match[3];
  console.log("Open:", open.substring(0, 50) + "...");
  console.log("Code snippet:", code.substring(0, 50) + "...");
}
