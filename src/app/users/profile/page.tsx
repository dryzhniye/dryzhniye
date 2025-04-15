'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/lib/const/PATH'
import { useMeQuery } from '@/shared/api/authApi'
import { getCookie } from '@/shared/lib/utils/cookieUtils'

const Profile = () => {

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      const reload = localStorage.getItem('reload')
      if (getCookie('oauthProvider') === 'github' && !data) {
        if (!reload) {
          localStorage.setItem('reload', 'true')
          window.location.reload()
        } else {
          console.warn('Page reloaded already, skipping reload to prevent loop.')
        }
      }
      if (data?.userId) {
        localStorage.removeItem('reload')
        redirect(PATH.USERS.PROFILE_USERID(data.userId))
      } else {
        localStorage.removeItem('reload')
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
