import { type ReactNode } from 'react'
import { cookies } from 'next/headers'
import { ProfileContext } from '@/lib/contexts/ProfileContext'

type Props = {
  children: ReactNode
  params: {
    userId: string
  }
}

export default async function ProtectedSettings({ children, params }: Props) {
  async function fetchMe() {
    debugger
    const res = await fetch(`https://inctagram.work/api/v1/auth/me`, {
      headers: {
        Cookie: cookies().toString(),
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    return res.json()
  }


//todo: make protected route for settings

  const user = await fetchMe()

  const authUser = await fetch(`https://inctagram.work/api/v1/users/profile`)

  const res = await authUser.json()



  // if (!user) {
  //   redirect('/auth/sign-in')
  // }
  //
  // if (user.userId !== params.userId) {
  //   notFound()
  // }

  return <>
    {/*<ProfileContext.Provider value={res}>*/}
    {children}
    {/*</ProfileContext.Provider>*/}
  </>
}
