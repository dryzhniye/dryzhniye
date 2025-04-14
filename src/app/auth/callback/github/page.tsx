'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { getDecodedToken } from '@/shared/utils/getDecodedToken'
import { PATH } from '@/shared/const/PATH'
import { setCookie } from '@/shared/utils/cookieUtils'

export default function GithubPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GithubPageContent />
    </Suspense>
  )
}

const GithubPageContent = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (!accessToken) {
      const redirectUrl = 'http://localhost:3000/auth/callback'
      window.location.assign(`https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`)
    } else {
      try {
        setCookie('accessToken', accessToken, 7)
        setCookie('oauthProvider', 'github', 7)
        const userId = getDecodedToken(accessToken)
        if (userId) {
          replace(`/users/profile`)
        } else {
          replace(PATH.AUTH.LOGIN)
        }
      } catch {
        replace(PATH.AUTH.LOGIN)
      }
    }
  }, [replace, searchParams])

  return (
    <>
      <p>Loading...</p>
      Processing GitHub authorization...
    </>
  )
}
