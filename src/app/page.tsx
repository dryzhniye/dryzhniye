import { Typography } from '@/shared/ui/Typography/Typography'
import { DatePicker } from '@/shared/ui/DatePicker'
import { Scrollbar } from '@/shared/ui/Scrollbar/Scrollbar'
import s from './page.module.scss'

export default function Home() {
  return (
    <>
      <span className={s.spanColor}>test</span>
      <Typography variant={'medium-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello World</Typography>
      <Typography variant={'regular-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello
        World</Typography>
      <Typography variant={'large'} font={'roboto'} as={'div'} className={s.spanColor}>Hello
        World</Typography>
      <Typography asChild={true}><h1>hello world</h1></Typography>
      <div style={{ display: 'flex', gap: '4px' }}><DatePicker mode={'single'} />
        <DatePicker /></div>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '500px' }}>
        <Scrollbar>
        <div style={{ width: '300px', height: '300px'}}>
          <div style={{ width: '1000px', height: '1000px', background: 'lightgray' }}>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
          </div>
        </div>
        </Scrollbar>
      </div>
    </>
  )
}
