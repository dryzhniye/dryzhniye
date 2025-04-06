'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGoogleLoginMutation } from '@/lib/api/authApi'

interface Error {
  statusCode: number,
  messages: [{ message: string, field: string }],
  error: string
}

const GoogleCallback = () => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      googleLogin({
        redirectUrl: 'http://localhost:3000/auth/callback/google',
        code: decodeURIComponent(code),
      })
        .unwrap()
        .then((data: { accessToken: string, email: string}) => {
          if (data?.accessToken) {
            localStorage.setItem('token', data.accessToken)
            router.replace('/')
          }
        })
        .catch((err: Error) => {
          console.error('Login failed:', err.messages[0].message)
        })
    }
  }, [router, searchParams, googleLogin])

  return <p>{isLoading ? 'Logging you in with Google...' : 'Google login failed'}</p>
}

export default GoogleCallback
