'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/lib/api/authApi'

export const useRequireMeWithAnonymRedirect = () => {
  const router = useRouter()

  const { data, isFetching } = useMeQuery()

  useEffect(() => {
    console.log('data: ' + !!data)
    console.log('isFetching: ' + isFetching)
    if (!data && !isFetching) {
      router.push('/auth/sign-in')
    }
  }, [data, isFetching])

  return data
}

