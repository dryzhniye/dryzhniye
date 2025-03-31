import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'
import { Header } from '@/shared/ui/Header/Header'

export default function LoginPage() {
  return (
    <div>
      <Header isLoggedIn={false} notifications={true} countNotifications={10} />
      <Sidebar />
    </div>
  )
}
