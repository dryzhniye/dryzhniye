import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMeQuery } from '@/lib/api/authApi'

export const useRedirectIfAuthorized = () => {
  const router = useRouter()

  const { data, isLoading, isFetching } = useMeQuery()

  useEffect(() => {
    if (data && !isFetching) {
      router.push(`/users/profile/${data.userId}`)
    }
  }, [data, isFetching])

  return { isLoading }
}