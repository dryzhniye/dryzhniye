'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGoogleLoginMutation } from '@/shared/api/authApi'
import { setCookie } from '@/shared/lib/utils/cookieUtils'

interface Error {
  statusCode: number,
  messages: [{ message: string, field: string }],
  error: string
}

const GoogleCallbackContent = () => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      googleLogin({
        redirectUrl: 'https://dryzhniye.ru/auth/callback/google',
        code: decodeURIComponent(code),
      })
        .unwrap()
        .then((data: { accessToken: string, email: string}) => {
          if (data?.accessToken) {
            setCookie('accessToken', data.accessToken.trim(), 7)
            router.replace('/')
          }
        })
        .catch((err: Error) => {
          console.error('Login failed:', err.messages[0].message)
        })
    }
  }, [router, searchParams, googleLogin])

  return <p>{isLoading && 'Logging you in with Google...'}</p>
}

const GoogleCallback = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GoogleCallbackContent />
    </Suspense>
  )
}

export default GoogleCallback