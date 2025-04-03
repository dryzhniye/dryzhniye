'use client'
import { useSelector } from 'react-redux'
import { Header } from '@/shared/ui/Header/Header'
import { selectAppStatus } from '@/app/redux/loadingSlice'
import LinearProgres from '@/shared/ui/Linear/LinearProgres'

const LoadingHeader = () => {
  const status = useSelector(selectAppStatus)

  return (
    <>
      <Header isLoggedIn={true} />
      {status === 'loading' && <LinearProgres color={'var(--accent-700)'} />}
    </>
  )
}

export default LoadingHeader
