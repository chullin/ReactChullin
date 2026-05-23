import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { series } from '@/config/blog';

export const runtime = 'nodejs';

type SearchDocument = {
  href: string;
  title: string;
  subtitle: string;
  seriesLabel: string;
  seriesDescription: string;
  body: string;
};

type SearchResult = {
  href: string;
  score: number;
};

let documentCache: Promise<SearchDocument[]> | undefined;

const normalize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getQueryTokens = (query: string) =>
  normalize(query)
    .split(/\s+/)
    .map(token => token.trim())
    .filter(Boolean);

const pagePathFromHref = (href: string) => {
  const cleanHref = href.replace(/^\/+/, '');
  return path.join(process.cwd(), 'app', cleanHref, 'page.tsx');
};

const readPostSource = async (href: string) => {
  const pagePath = pagePathFromHref(href);
  const postDir = path.dirname(pagePath);

  try {
    const files = await readdir(postDir);
    const tsxFiles = files.filter(file => file.endsWith('.tsx'));
    const sources = await Promise.all(
      tsxFiles.map(file => readFile(path.join(postDir, file), 'utf8'))
    );

    return sources.join(' ');
  } catch {
    return '';
  }
};

const cleanPageSource = (source: string) =>
  source
    .replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, ' ')
    .replace(/className=(["'`])[\s\S]*?\1/g, ' ')
    .replace(/[{}()[\]<>.,;:="'`$]/g, ' ')
    .replace(/\s+/g, ' ');

const loadDocuments = async () => {
  const docs = await Promise.all(
    series.flatMap(blogSeries =>
      blogSeries.posts
        .filter(post => !post.isExternal)
        .map(async post => {
          const body = cleanPageSource(await readPostSource(post.href));

          return {
            href: post.href,
            title: post.title,
            subtitle: post.subtitle,
            seriesLabel: blogSeries.label,
            seriesDescription: blogSeries.description,
            body,
          };
        })
    )
  );

  return docs;
};

const getDocuments = () => {
  documentCache ??= loadDocuments();
  return documentCache;
};

const countToken = (text: string, token: string) => {
  let count = 0;
  let index = text.indexOf(token);

  while (index !== -1 && count < 20) {
    count += 1;
    index = text.indexOf(token, index + token.length);
  }

  return count;
};

const scoreDocument = (doc: SearchDocument, tokens: string[]) => {
  const title = normalize(doc.title);
  const subtitle = normalize(doc.subtitle);
  const seriesText = normalize(`${doc.seriesLabel} ${doc.seriesDescription}`);
  const body = normalize(doc.body);
  const fullText = `${title} ${subtitle} ${seriesText} ${body}`;

  if (!tokens.every(token => fullText.includes(token))) {
    return 0;
  }

  return tokens.reduce((score, token) => {
    const titleScore = title.includes(token) ? 18 : 0;
    const subtitleScore = subtitle.includes(token) ? 12 : 0;
    const seriesScore = seriesText.includes(token) ? 6 : 0;
    const bodyScore = Math.min(countToken(body, token), 10);

    return score + titleScore + subtitleScore + seriesScore + bodyScore;
  }, 0);
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? '';
  const tokens = getQueryTokens(query);

  if (tokens.length === 0) {
    return NextResponse.json({ results: [] satisfies SearchResult[] });
  }

  const documents = await getDocuments();
  const results = documents
    .map(doc => ({
      href: doc.href,
      score: scoreDocument(doc, tokens),
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 80);

  return NextResponse.json({ results });
}
