import fs from 'fs';
import path from 'path';

type HtmlPageProps = {
  src: string;
};

// Keep legacy page sources explicit so the deployment tracer does not include
// the entire project (and its media assets) for an arbitrary filesystem path.
function readHtmlSource(src: string) {
  if (src === 'post.html') {
    const filePath = path.join(process.cwd(), 'post.html');
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : undefined;
  }
  if (src === 'Segmented Video Player.html') {
    const filePath = path.join(process.cwd(), 'Segmented Video Player.html');
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : undefined;
  }
  return undefined;
}

function extractBody(html: string) {
  const matches = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (matches && matches[1]) {
    return matches[1];
  }
  return html;
}

export default function HtmlPage({ src }: HtmlPageProps) {
  const rawHtml = readHtmlSource(src);

  if (rawHtml === undefined) {
    return <div>Source file not found: {src}</div>;
  }

  const body = extractBody(rawHtml)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, '')
    .replace(/<link[^>]+href=["']?css\/styles\.css["']?[^>]*>/gi, '');

  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
