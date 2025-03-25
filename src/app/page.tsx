import { Typography } from '@/shared/ui/Typography/Typography'
import s from './page.module.scss'
import { DatePicker } from '@/shared/ui/DatePicker'

export default function Home() {
  return (
    <>
      <span className={s.spanColor}>test</span>
      <Typography variant={'medium-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello World</Typography>
      <Typography variant={'regular-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello
        World</Typography>
      <Typography asChild={true}><h1>hello world</h1></Typography>
      <div style={{ display: 'flex', gap: '4px' }}><DatePicker mode={'single'} />
        <DatePicker /></div>
    </>
  )
}


