import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production';
const SECRET_KEY = new TextEncoder().encode(SESSION_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('=== Middleware ===');
  console.log('Pathname:', pathname);
  console.log('SESSION_SECRET configured:', !!SESSION_SECRET);

  // Check if it's an admin route (except login and API routes)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/api/admin')) {
    const sessionCookie = request.cookies.get('admin_session');
    console.log('admin_session cookie exists:', !!sessionCookie);
    
    if (!sessionCookie) {
      console.log('No session cookie, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify JWT token using jose
    try {
      console.log('Verifying JWT token...');
      const { payload } = await jwtVerify(sessionCookie.value, SECRET_KEY);
      const expiresAt = new Date((payload as any).expiresAt);
      
      console.log('JWT verified, expiresAt:', expiresAt);
      
      // Check if session is expired
      if (expiresAt < new Date()) {
        console.log('Session expired, redirecting to login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      console.log('Session valid, allowing access');
    } catch (error) {
      console.error('JWT verification failed:', error);
      // Invalid token - redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};