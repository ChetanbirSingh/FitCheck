import { NextResponse, NextRequest } from 'next/server';
export type Techstack = 'html_css' | 'react' | 'next' | 'vue' | 'svelte' | 'solid' | 'angular';

export const supportedFileTypes: Record<string, string[]> = {
  html_css: ['.html', '.css', '.js', '.md'],
  react: ['.jsx', '.js', '.css', '.scss', '.md'],
  next: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.md'],
  vue: ['.vue', '.js', '.css', '.scss', '.md'],
  svelte: ['.svelte', '.js', '.css', '.md'],
  solid: ['.jsx', '.js', '.ts', '.tsx', '.md'],
  angular: ['.ts', '.html', '.css', '.md'],
};

const ignoredFiles: string[] = [
  'layout',
  '_app',
  '_document',
  '_layout',
  '_middleware',
  'middleware',
  'serviceWorker',
  '.config',
  '.test',
  '.spec',
  'vite.config',
  'tailwind.config',
  'postcss.config',
  'webpack.config',
  'babel.config',
  'jest.config',
];

const allowedStacks = Object.keys(supportedFileTypes) as Techstack[];

export async function POST(req: NextRequest) {
  const { url, techstack } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'Missing GitHub URL.' }, { status: 400 });
  }

  if (!allowedStacks.includes(techstack)) {
    return NextResponse.json({ error: 'Invalid tech stack provided.' }, { status: 400 });
  }

  const githubUrl = url
    .replace('https://github.com/', 'https://api.github.com/repos/')
    .replace(/\/$/, '')
    .concat('/contents');

  try {
    const processedData = await fetchMatchingFileNames(githubUrl, techstack);
    return NextResponse.json(processedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'GitHub fetch failed. Check if the URL is correct and the repo is public.' },
      { status: 500 },
    );
  }
}

async function fetchMatchingFileNames(githubUrl: string, techstack: Techstack): Promise<string[]> {
  const response = await fetch(githubUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await response.json();
  const matchingFiles: string[] = [];

  for (const item of data) {
    const path = githubUrl.split('/contents/')[1] || '';
    const fullPath = path ? `${path}/${item.name}` : item.name;

    if (item.type === 'file') {
      const shouldInclude =
        supportedFileTypes[techstack].some((ext) => item.name.endsWith(ext)) &&
        !ignoredFiles.some((ignore) => item.name.toLowerCase().includes(ignore));

      if (shouldInclude) {
        matchingFiles.push(fullPath);
      }
    } else if (item.type === 'dir') {
      const subUrl = `${githubUrl}/${item.name}`;
      const subFiles = await fetchMatchingFileNames(subUrl, techstack);
      matchingFiles.push(...subFiles);
    }
  }

  return matchingFiles;
}
