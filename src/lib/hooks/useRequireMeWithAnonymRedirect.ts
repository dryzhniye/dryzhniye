'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/lib/api/authApi'
import { PATH } from '@/shared/const/PATH'

export const useRequireMeWithAnonymRedirect = () => {
  const router = useRouter()

  const { data, isFetching } = useMeQuery()

  useEffect(() => {
    console.log('data: ' + !!data)
    console.log('isFetching: ' + isFetching)
    if (!data && !isFetching) {
      router.push(PATH.AUTH.LOGIN)
    }
  }, [data, isFetching, router])

  return data
}

