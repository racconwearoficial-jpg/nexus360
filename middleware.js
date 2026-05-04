import { NextResponse } from 'next/server'

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const publicPaths = ['/', '/login', '/register', '/pagamento']
  if (publicPaths.some(p => pathname === p)) return NextResponse.next()
  if (pathname.startsWith('/_next') || pathname.startsWith('/system') || pathname.includes('favicon')) return NextResponse.next()
  const hasSession = req.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.includes('-auth-token'))
  if (!hasSession) return NextResponse.redirect(new URL('/login', req.url))
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|system).*)'] }