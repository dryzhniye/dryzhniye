import LoginPage from '@/app/auth/sign-up/page'
import CardPosts from '@/shared/ui/CardPosts/CaedPosts'
// import { DatePicker } from '@/shared/ui/DatePicker'
// import { Scrollbar } from '@/shared/ui/Scrollbar/Scrollbar'
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar'
// import { Typography } from '@/shared/ui/Typography/Typography'
// import s from './page.module.scss'

export default function Home() {
  return (
    <>
      <LoginPage />
      <CardPosts post={} />
      <Sidebar />
    </>
  )
}
