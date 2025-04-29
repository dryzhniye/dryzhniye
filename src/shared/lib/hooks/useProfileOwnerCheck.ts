import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/shared/api/authApi'
import { PATH } from '@/shared/lib/const/PATH'
import { useEffect } from 'react'

export const useProfileOwnerCheck = (userId: string) => {
  const router = useRouter()
  const { data, isLoading, error } = useMeQuery()

  useEffect(() => {
    if (userId && !isLoading) {
      const isProfileOwner = +userId === data?.userId
      if (!isProfileOwner || error) {
        router.push(PATH.AUTH.LOGIN)
      }
    }
  }, [userId, isLoading, data, error, router])

  return { isLoading }
}