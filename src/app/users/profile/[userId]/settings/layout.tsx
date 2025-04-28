import { type ReactNode } from 'react'
import { cookies } from 'next/headers'

type Props = {
  children: ReactNode
}

export default async function ProtectedSettings({ children }: Props) {
  async function fetchMe() {
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

  await fetchMe()

  const authUser = await fetch(`https://inctagram.work/api/v1/users/profile`)

  await authUser.json()



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
