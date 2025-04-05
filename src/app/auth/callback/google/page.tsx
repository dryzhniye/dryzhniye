'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGoogleLoginMutation } from '@/app/auth/api/authApi'

const GoogleCallbackPage = () => {
  const [googleLogin, { isLoading, isSuccess, error }] = useGoogleLoginMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const code = searchParams.get('code')
    console.log(JSON.stringify({
      redirectUrl: 'http://localhost:3000/auth/callback/google',
      code,
    }))
debugger
    if (code) {
      googleLogin({
        redirectUrl: 'http://localhost:3000/auth/callback/google',
        code: decodeURIComponent(code),
      })
        .unwrap()
        .then((data: any) => {
          if (data?.accessToken) {
            localStorage.setItem('token', data.accessToken)
            router.replace('/')
          }
        })
        .catch((err: any) => {
          console.error('Login failed:', err)
        })
    }
  }, [ googleLogin])

  return <p>{isLoading ? 'Logging you in with Google...' : 'Google login failed'}</p>
}

export default GoogleCallbackPage
