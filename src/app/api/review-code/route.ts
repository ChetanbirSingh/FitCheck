import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { code, persona } = await req.json();

  const envKey = `${persona}_PROMPT`.toUpperCase();
  const prompt =
    process.env[envKey] ??
    `Review this code as ${persona}. Just give feedback clearly and be honest.`;

  const result = streamText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: `${prompt} Format the feedback in Markdown using level-2 headings (##) for each section. Do not use any level-1 headings (#). Add a relevant emoji at the beginning of each heading to make it more visually engaging.`,
      },
      { role: 'user', content: formatCodeToString(code) },
    ],
  });

  return result.toTextStreamResponse();
}

function formatCodeToString(codeObj: Record<string, { code: string }>) {
  return Object.entries(codeObj)
    .map(([filename, { code }]) => {
      const trimmedCode = code
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n');
      return `${filename}\n\`\`\`\n${trimmedCode}\n\`\`\``;
    })
    .join('\n\n');
}
