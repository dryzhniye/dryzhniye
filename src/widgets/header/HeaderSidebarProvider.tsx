'use client'
import { useSelector } from 'react-redux'
import { Header } from '@/shared/ui/Header/Header'
import { selectAppStatus, selectIsLoggedIn } from '@/app/redux/appSlice'
import LinearProgress from '@/shared/ui/Linear/LinearProgress'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'
import s from './HeaderSidebar.module.scss'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({children}: Props) => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {status === 'loading' && <LinearProgress color={'var(--accent-700)'} />}
      {isLoggedIn && <Sidebar />}
      <div className={`${s.mainContent} ${isLoggedIn ? s.withSidebar : ''}`}>
        {children}
      </div>
    </>
  )
}

export default HeaderSidebarProvider
