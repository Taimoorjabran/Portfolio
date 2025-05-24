import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If no token or user is not an admin, redirect
  if (!token || token.role !== 'admin') {
    return NextResponse.redirect(new URL('/user/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'], // Protect the dashboard route
};
