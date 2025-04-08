import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PATH } from '@/shared/const/PATH'

export function middleware(request: NextRequest) {
  const publicPaths = [
    PATH.GITHUB,
    PATH.MAIN,
    PATH.AUTH.LOGIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.RECOVERY,
    PATH.AUTH.RECOVERY_RESENDING,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.REGISTRATION_EMAIL_RESENDING,
    PATH.AUTH.TERMS_OF_SERVICE,
    PATH.USERS.PROFILE_USERID,
    PATH.PUBLIC.PUBLIC_PAGE,
    PATH.PUBLIC.PROFILE,
  ]
  const { pathname } = request.nextUrl
  const encryptedToken = request.cookies.get('accessToken')?.value

  if (encryptedToken && publicPaths.some(path =>
    typeof path === 'string' ? path === pathname : path.test(pathname),
  )) {
    return NextResponse.redirect(new URL(PATH.USERS.PROFILE, request.url)) // Перенаправляем на профиль
  }

  if (!encryptedToken && !publicPaths.some(path =>
    typeof path === 'string' ? path === pathname : path.test(pathname),
  )) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
