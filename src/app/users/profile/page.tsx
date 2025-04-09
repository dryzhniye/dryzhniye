'use client'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectUserId } from '@/app/redux/appSlice'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/const/PATH'

const Profile = () => {
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    if (userId) {
      redirect(PATH.USERS.PROFILE_USERID(userId))
    } else {
      redirect(PATH.MAIN)
    }
  }, [userId])

  return (
    <>
      Profile
    </>
  )
}

export default Profile
