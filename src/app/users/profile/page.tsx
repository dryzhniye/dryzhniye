'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/lib/const/PATH'
import { useMeQuery } from '@/shared/api/authApi'
import { deleteCookie, getCookie } from '@/shared/lib/utils/cookieUtils'

const Profile = () => {

  const { data, isLoading, error } = useMeQuery()

  useEffect(() => {
debugger
    if (!isLoading) {

      if (getCookie('oauthProvider') === 'github' && !data) {

          if (error) {
            if (getCookie('accessToken') && getCookie('oauthProvider')) {
              // deleteCookie('accessToken')
              // deleteCookie('oauthProvider')
            }
          } else {
            window.location.reload()
          }
      }
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
