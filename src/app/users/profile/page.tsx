'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/const/PATH'
import { useMeQuery } from '@/lib/api/authApi'
import { getCookie } from '@/shared/utils/cookieUtils'

const Profile = () => {

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      const reload = localStorage.getItem('reload')
      if (getCookie('oauthProvider') === 'github' && !data) {
        if (!reload) {
          localStorage.setItem('reload', 'true')
          window.location.reload()
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
