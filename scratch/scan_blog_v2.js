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
  
  let title = '';
  let subtitle = '';

  // Strategy 1: Check metadata export
  const metaTitleMatch = content.match(/title:\s*['"](.*?)['"]/);
  const metaDescMatch = content.match(/description:\s*['"](.*?)['"]/);

  if (metaTitleMatch) {
    title = metaTitleMatch[1].split('|')[0].trim();
  }
  if (metaDescMatch) {
    subtitle = metaDescMatch[1].trim();
  }

  // Strategy 2: If title still empty, check h1 in page.tsx (standard layout)
  if (!title) {
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (h1Match) {
      title = h1Match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }
  }

  // Strategy 3: Check p tags for subtitle if missing
  if (!subtitle) {
    const pMatch = content.match(/<p[^>]*className="[^"]*text-(?:xl|lg|md|sm)[^"]*"[^>]*>([\s\S]*?)<\/p>/) || 
                   content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (pMatch) {
      subtitle = pMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }
  }

  // Strategy 4: If still empty, check PostContent.tsx in the same folder
  if (!title || !subtitle) {
    const postContentPath = path.join(path.dirname(filePath), 'PostContent.tsx');
    if (fs.existsSync(postContentPath)) {
      const pcContent = fs.readFileSync(postContentPath, 'utf-8');
      if (!title) {
        const h1Match = pcContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        if (h1Match) {
          title = h1Match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        }
      }
      if (!subtitle) {
        const pMatch = pcContent.match(/<p[^>]*className="[^"]*text-(?:xl|lg|md|sm)[^"]*"[^>]*>([\s\S]*?)<\/p>/) || 
                       pcContent.match(/<p[^>]*>([\s\S]*?)<\/p>/);
        if (pMatch) {
          subtitle = pMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        }
      }
    }
  }
  
  // Final cleanup and fallbacks
  title = title || slug;
  subtitle = subtitle || '深入探討此技術的主題與實踐。';

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
    subtitle: subtitle.substring(0, 150) + (subtitle.length > 150 ? '...' : ''),
    href: `/blog/${relPath}`,
    ep,
    date: '2026'
  });
});

console.log(JSON.stringify(results, null, 2));
