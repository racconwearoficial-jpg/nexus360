// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res      = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = req.nextUrl

  // Rotas públicas
  const publicPaths = ['/', '/login', '/register', '/pagamento']
  if (publicPaths.includes(pathname)) {
    if (session && pathname !== '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return res
  }

  // Admin
  if (pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', req.url))
    if (session.user?.user_metadata?.role !== 'super_admin')
      return NextResponse.redirect(new URL('/dashboard', req.url))
    return res
  }

  // Dashboard e sistema
  if (!session) return NextResponse.redirect(new URL('/login', req.url))
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|system).*)'],
}
