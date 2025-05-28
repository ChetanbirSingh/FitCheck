import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { allowedStacks } from './app/api/extract-files/route';
import { Techstack } from './app/api/extract-files/route';
import { allowedPersona } from './components/PersonSelection';

export function middleware(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get('persona');
  const techstack = searchParams.get('techstack');

  const isValid =
    persona &&
    allowedPersona.includes(persona) &&
    techstack &&
    allowedStacks.includes(techstack);

  if (isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/review', req.url));
}

export const config = {
  matcher: '/review/result',
};
