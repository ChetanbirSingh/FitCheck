import { NextResponse, NextRequest } from 'next/server';
import { TechstackTypes, allowedStacks, supportedFileTypes, ignoredFiles } from '@/lib/constants';

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

async function fetchMatchingFileNames(
  githubUrl: string,
  techstack: TechstackTypes,
): Promise<string[]> {
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
