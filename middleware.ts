import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/supabase/auth';

// Define protected routes
const protectedRoutes = ['/admin/dashboard', '/admin/articles'];
const publicRoutes = ['/admin', '/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    // Allow access to public admin routes (login page)
    if (publicRoutes.some(route => pathname === route)) {
      // If user is already logged in and tries to access login page, redirect to dashboard
      const token = request.cookies.get('adminToken')?.value;
      if (token) {
        try {
          // Verify token is valid
          await verifyToken(token);
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch {
          // Token is invalid, continue to login page
        }
      }
      return NextResponse.next();
    }

    // All other admin routes require authentication
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      // No token found, redirect to login
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token is valid
    try {
      await verifyToken(token);
    } catch (error) {
      // Token is invalid or expired, redirect to login
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
