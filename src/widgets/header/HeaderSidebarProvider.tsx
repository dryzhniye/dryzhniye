'use client'
import { useSelector } from 'react-redux'
import { Header } from '@/shared/ui/Header/Header'
import { selectAppStatus, selectIsLoggedIn } from '@/app/redux/appSlice'
import LinearProgres from '@/shared/ui/Linear/LinearProgres'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'

const HeaderSidebarProvider = () => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {status === 'loading' && <LinearProgres color={'var(--accent-700)'} />}
      {isLoggedIn && <Sidebar />}
    </>
  )
}

export default HeaderSidebarProvider
