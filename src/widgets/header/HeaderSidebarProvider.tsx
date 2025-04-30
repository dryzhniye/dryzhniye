'use client'
import { useSelector } from 'react-redux'
import { Header } from '@/shared/ui/base/Header/Header'
import { selectAppStatus, selectIsLoggedIn } from '@/store/slices/appSlice'
import LinearProgress from '@/shared/ui/base/Linear/LinearProgress'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { Sidebar } from '@/shared/ui/base/Sidebar/Sidebar'
import s from './HeaderSidebar.module.scss'
import { useConnectSocket } from '@/shared/lib/hooks/useConnectSocket'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({children}: Props) => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const {notifications} = useConnectSocket()
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} notifications={notifications} hasUnread={!!unreadCount} countNotifications={ unreadCount}/>
      {status === 'loading' && <LinearProgress color={'var(--accent-700)'} />}
      {isLoggedIn && <Sidebar />}
      <div className={`${s.mainContent} ${isLoggedIn ? s.withSidebar : ''}`}>
        {children}
      </div>
    </>
  )
}

export default HeaderSidebarProvider
