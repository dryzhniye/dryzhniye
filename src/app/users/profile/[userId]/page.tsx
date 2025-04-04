'use client'
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'
import { useRequireMeWithAnonymRedirect } from '@/lib/hooks/useRequireMeWithAnonymRedirect'

const Profile = () => {
  useRequireMeWithAnonymRedirect()

  return (
    <>
      <Sidebar />
    </>
  )
}

export default Profile
