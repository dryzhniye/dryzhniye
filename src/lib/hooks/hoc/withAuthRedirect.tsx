'use client'

import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/app/auth/api/authApi'
import { AppInitializer } from '@/app/AppInitializer'

export const withAuthRedirect = (Component: () => ReactNode) => {
  return function ProtectedRoute(): ReactElement {
    const { data, isLoading } = useMeQuery()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && data?.email && data?.userId) {
        router.push(`../users/profile/${data.userId}`)
      }
    }, [data, isLoading, router])

    if (isLoading) {
      return <AppInitializer>{null}</AppInitializer>
    }

    return <Component />
  }
}
