// FORGE — Middleware
// Protects authenticated routes and refreshes the session cookie on every request.

import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase-middleware'

// Routes that require authentication
const PROTECTED_PREFIXES = ['/dashboard', '/project', '/learn', '/courses', '/settings']

// Routes that are always accessible (no auth required)
const PUBLIC_PATHS = ['/', '/login', '/register', '/prompts', '/templates']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths, auth callbacks, API routes, and static assets
  if (
    PUBLIC_PATHS.some((p) => pathname === p) ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.svg' ||
    pathname === '/manifest.json' ||
    pathname.includes('.') // static files: .png, .jpg, .css, etc.
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next()
  const supabase = createMiddlewareClient(request, response)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (isProtected && !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If logged in and visiting auth pages, redirect to dashboard
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static (static files)
     *  - _next/image (image optimization files)
     *  - favicon.ico / favicon.svg (favicon file)
     *  - public folder files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
