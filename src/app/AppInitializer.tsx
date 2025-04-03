'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMeQuery } from '@/app/auth/api/authApi'
import { useAppDispatch } from '@/app/appHooks'
import { setAppEmail, setIsLoggedIn } from '@/app/redux/appSlice'

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.email) {
        dispatch(setAppEmail(data.email))
        dispatch(setIsLoggedIn(true))
      }
    }
  }, [data, isLoading, dispatch])

  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Image src="/loader.svg" alt="loader" width={100} height={100} />
      </div>
    )
  }
  return <>
    {children}
  </>
}