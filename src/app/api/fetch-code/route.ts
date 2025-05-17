export async function POST(req: Request) {
  const { url, files } = await req.json();
  const filesArray = files;
  const githubUrl = url
    .replace('https://github.com/', 'https://api.github.com/repos/')
    .replace(/\/$/, '')
    .concat('/contents');
  try {
    const fetchedCode = await fetchCode(githubUrl, filesArray);
    return Response.json(fetchedCode, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: 'GitHub fetch failed. Check if the URL is correct and the repo is public.',
      },
      { status: 500 },
    );
  }
}

async function fetchCode(githubUrl: string, filesArray: string[]) {
  const result: Record<string, { code: string }> = {};

  for (const file of filesArray) {
    const res = await fetch(`${githubUrl}/${file}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    const decoded =
      data.encoding === 'base64' ? Buffer.from(data.content, 'base64').toString('utf-8') : '';

    result[file] = { code: decoded };
  }

  return result;
}
