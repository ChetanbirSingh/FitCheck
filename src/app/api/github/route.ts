export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return Response.json({ error: 'Missing GitHub URL.' }, { status: 400 });
  }

  const githubUrl = url
    .replace('https://github.com/', 'https://api.github.com/repos/')
    .replace(/\/$/, '')
    .concat('/contents');

  try {
    const response = await fetch(githubUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`!,
      },
    });

    const data = await response.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'GitHub fetch failed. Check if the URL is correct and the repo is public.' },
      { status: 500 },
    );
  }
}
