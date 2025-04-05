'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAppStatus } from '@/app/redux/appSlice'

export default function GitHubCallbackPage() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const dispatch = useDispatch()

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      if (!code) return
      try {
        dispatch(setAppStatus('loading'))
        const response = await fetch('/api/github-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        localStorage.setItem('token', data.accessToken)
        window.location.href = '/' // Redirect home
      } catch (err) {
        alert('GitHub login failed')
      } finally {
        dispatch(setAppStatus('succeeded'))
      }
    }

    exchangeCodeForToken()
  }, [code])

  return <div>Logging in with GitHub...</div>
}
