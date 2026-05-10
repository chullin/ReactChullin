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
  
  if (filePath.endsWith('app/blog/page.tsx')) return;

  const relPath = path.relative(blogRoot, filePath).replace('/page.tsx', '');
  const parts = relPath.split('/');
  const seriesId = parts[0];
  const slug = parts[1] || '';
  
  let title = '';
  let subtitle = '';

  // Improved Strategy 1: Check metadata export block specifically
  const metadataBlockMatch = content.match(/export const metadata(?:: Metadata)? = \{([\s\S]*?)\};/);
  if (metadataBlockMatch) {
    const block = metadataBlockMatch[1];
    const titleMatch = block.match(/title:\s*['"](.*?)['"]/);
    const descMatch = block.match(/description:\s*['"](.*?)['"]/);
    if (titleMatch) title = titleMatch[1].split('|')[0].trim();
    if (descMatch) subtitle = descMatch[1].trim();
  }

  // Strategy 2: If title still empty, check h1 in page.tsx (standard layout)
  // We look for the h1 that is most likely the main title (usually higher up)
  if (!title) {
    const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    for (const match of h1Matches) {
      const candidate = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      // Heuristic: titles are usually longer than a few words but not paragraphs
      if (candidate.length > 5 && candidate.length < 100) {
        title = candidate;
        break;
      }
    }
  }

  // Strategy 3: Check p tags for subtitle if missing
  if (!subtitle) {
    const pMatches = [...content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
    for (const match of pMatches) {
      const candidate = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (candidate.length > 20 && candidate.length < 300) {
        subtitle = candidate;
        break;
      }
    }
  }

  // Strategy 4: If still empty, check PostContent.tsx in the same folder
  if (!title || !subtitle) {
    const postContentPath = path.join(path.dirname(filePath), 'PostContent.tsx');
    if (fs.existsSync(postContentPath)) {
      const pcContent = fs.readFileSync(postContentPath, 'utf-8');
      if (!title) {
        const h1Matches = [...pcContent.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
        for (const match of h1Matches) {
          const candidate = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          if (candidate.length > 5 && candidate.length < 100) {
            title = candidate;
            break;
          }
        }
      }
      if (!subtitle) {
        const pMatches = [...pcContent.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
        for (const match of pMatches) {
          const candidate = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          if (candidate.length > 20 && candidate.length < 300) {
            subtitle = candidate;
            break;
          }
        }
      }
    }
  }
  
  // Final cleanup
  title = title || slug;
  subtitle = subtitle || '深入探討此技術的主題與實踐。';

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
