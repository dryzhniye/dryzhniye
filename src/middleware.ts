import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PATH } from '@/shared/lib/const/PATH'

export function middleware(request: NextRequest) {
  const alwaysPublicPaths: (string | RegExp)[] = [
    PATH.MAIN,
    PATH.USERS.PROFILE,
    PATH.USERS.PROFILE_USERID_REGEX
  ]

  const publicPathsForGuestsOnly: (string | RegExp)[] = [
    PATH.AUTH.LOGIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.RECOVERY,
    PATH.AUTH.RECOVERY_RESENDING,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.REGISTRATION_EMAIL_RESENDING,
    PATH.AUTH.TERMS_OF_SERVICE,
    PATH.GITHUB,
    '/auth/callback/google',
  ]

  const { pathname } = request.nextUrl
  const encryptedToken = request.cookies.get('accessToken')?.value

  const isAlwaysPublic = alwaysPublicPaths.some(path =>
    typeof path === 'string' ? path === pathname && path !== PATH.AUTH.PRIVACY_POLICY : path.test(pathname),
  )

  const isPublicForGuestsOnly = publicPathsForGuestsOnly.some(path =>
    typeof path === 'string' ? path === pathname && path !== PATH.AUTH.PRIVACY_POLICY : path.test(pathname),
  )

  if (encryptedToken && isPublicForGuestsOnly) {
    return NextResponse.redirect(new URL(PATH.USERS.PROFILE, request.url))
  }

  if (!encryptedToken && !isAlwaysPublic && !isPublicForGuestsOnly) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}