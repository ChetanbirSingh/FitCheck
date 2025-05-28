import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { allowedStacks, ModesType } from './lib/constants';
import { allowedPersona, TechstackTypes } from './lib/constants';

export function middleware(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get('persona');
  const techstack = searchParams.get('techstack');

  const isValid =
    persona &&
    allowedPersona.includes(persona as ModesType) &&
    techstack &&
    allowedStacks.includes(techstack as TechstackTypes);

  if (isValid) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/review', req.url));
}

export const config = {
  matcher: '/review/result',
};
