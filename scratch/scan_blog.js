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

const results = [];

allPages.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip the main index page
  if (filePath.endsWith('app/blog/page.tsx')) return;

  const relPath = path.relative(blogRoot, filePath).replace('/page.tsx', '');
  const parts = relPath.split('/');
  const seriesId = parts[0];
  const slug = parts[1] || '';
  
  // Extract Title
  let title = '';
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1Match) {
    title = h1Match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Extract Subtitle
  let subtitle = '';
  const pMatch = content.match(/<p[^>]*className="[^"]*text-(?:xl|lg|md|sm)[^"]*"[^>]*>([\s\S]*?)<\/p>/) || 
                 content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (pMatch) {
    subtitle = pMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  
  // Infer EP from slug or title
  let ep = '';
  const epMatch = slug.match(/ep(\d+)/i) || title.match(/EP\.?\s*(\d+)/i);
  if (epMatch) {
    ep = `EP.${epMatch[1]}`;
  }

  results.push({
    seriesId,
    slug,
    title,
    subtitle: subtitle.substring(0, 100) + (subtitle.length > 100 ? '...' : ''),
    href: `/blog/${relPath}`,
    ep,
    date: '2026' // Default
  });
});

console.log(JSON.stringify(results, null, 2));
