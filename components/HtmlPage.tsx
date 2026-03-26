import fs from 'fs';
import path from 'path';

type HtmlPageProps = {
  src: string;
};

function extractBody(html: string) {
  const matches = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (matches && matches[1]) {
    return matches[1];
  }
  return html;
}

export default function HtmlPage({ src }: HtmlPageProps) {
  const filePath = path.join(process.cwd(), src);

  if (!fs.existsSync(filePath)) {
    return <div>Source file not found: {src}</div>;
  }

  const rawHtml = fs.readFileSync(filePath, 'utf8');
  const body = extractBody(rawHtml)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, '')
    .replace(/<link[^>]+href=["']?css\/styles\.css["']?[^>]*>/gi, '');

  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
