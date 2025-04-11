'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/const/PATH'
import { useMeQuery } from '@/lib/api/authApi'

const Profile = () => {

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      if (data?.userId) {
        redirect(PATH.USERS.PROFILE_USERID(data.userId))
      } else {
        redirect(PATH.MAIN)
      }
    }
  }, [data, isLoading])

  return (
    <>
      Profile
    </>
  )
}

export default Profile
