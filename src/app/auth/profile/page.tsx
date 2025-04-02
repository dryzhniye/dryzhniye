import { Header } from '@/shared/ui/Header/Header'
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'

const Profile = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <Sidebar />
    </>
  )
}

export default Profile
