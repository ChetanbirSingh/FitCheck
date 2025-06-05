import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { formatCodeToString } from '@/utils/format/formatCode';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const rate = await checkRateLimit(ip);
  if (rate.limited) {
    return NextResponse.json({ error: rate.message }, { status: rate.status });
  }
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
