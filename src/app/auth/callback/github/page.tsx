'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const GithubCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const email = searchParams.get('email')

    if (accessToken && email) {
      localStorage.setItem('token', accessToken)
      // Optionally set user/email in your store

      router.replace('/')
    } else {
      console.error('Missing access token or email in the URL')
    }
  }, [searchParams, router])

  return <p>Logging you in via GitHub...</p>
}

export default GithubCallback
































// 'use client'
//
// import { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useGoogleAuthMutation } from '@/app/auth/api/authApi'
// import { setAppStatus } from '@/app/redux/appSlice'
// import { useDispatch } from 'react-redux'
//
// export default function GoogleCallback() {
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const code = searchParams.get('code')
//   const [googleAuth] = useGoogleAuthMutation()
//   const dispatch = useDispatch()
//
//   useEffect(() => {
//     if (!code) {
//       // setError('No authentication code provided')
//       setError('All good')
//       setLoading(false)
//       return
//     }
//
//     const handleGoogleCallback = async () => {
//       try {
//         dispatch(setAppStatus('loading'))
//         const redirectUrl = `${window.location.origin}/auth/callback`
//         const response = await googleAuth({ code, redirectUrl }).unwrap()
//
//         // Save the token
//         localStorage.setItem('token', response.accessToken)
//
//         dispatch(setAppStatus('succeeded'))
//         router.push('/') // Redirect to dashboard or homepage
//       } catch (error) {
//         console.error('Google authentication error:', error)
//         setError('Failed to authenticate with Google')
//         dispatch(setAppStatus('succeeded'))
//       } finally {
//         setLoading(false)
//       }
//     }
//
//     handleGoogleCallback()
//   }, [code, googleAuth, router, dispatch])
//
//   if (loading) {
//     return <div>Loading...</div>
//   }
//
//   if (error) {
//     return <div>{error}</div>
//   }
//
//   return null
// }