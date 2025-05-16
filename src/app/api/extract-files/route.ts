type Techstack = 'html_css' | 'react' | 'next' | 'vue';

const supportedFileTypes: Record<Techstack, string[]> = {
  html_css: ['.html', '.css', '.js'],
  react: ['.jsx', '.js', '.css', '.scss'],
  next: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss'],
  vue: ['.vue', '.js', '.css', '.scss'],
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

export async function POST(req: Request) {
  const { url, techstack } = await req.json();

  if (!url) {
    return Response.json({ error: 'Missing GitHub URL.' }, { status: 400 });
  }

  const githubUrl = url
    .replace('https://github.com/', 'https://api.github.com/repos/')
    .replace(/\/$/, '')
    .concat('/contents');

  try {
    const processedData = await fetchMatchingFileNames(githubUrl, techstack);
    return Response.json(processedData, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: 'GitHub fetch failed. Check if the URL is correct and the repo is public.',
      },
      { status: 500 },
    );
  }
}

async function fetchMatchingFileNames(
  githubUrl: string,
  techstack: Techstack,
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
