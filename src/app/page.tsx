import { Typography } from '@/shared/ui/Typography/Typography'
import s from './page.module.scss'

export default function Home() {
  return (
    <>
      <span className={s.spanColor}>test</span>
      <Typography variant={'large'} font={'roboto'} as={'div'} className={s.spanColor}>Hello World</Typography>
      <Typography asChild={true}><h1>hello world</h1></Typography>
    </>
    )
}


