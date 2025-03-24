import { Typography } from '@/shared/ui/Typography/Typography'
import s from './page.module.scss'
import { Inputt } from '@/shared/ui/DatePicker/DatePicker'
import { DayPicker } from 'react-day-picker'
import { TestPicker } from '@/shared/ui/DatePicker/TestPicker'
import "react-day-picker/style.css";
// import MyDatePicker from '@/shared/ui/DatePicker/DatePicker'

export default function Home() {
  return (
    <>
      <span className={s.spanColor}>test</span>
      <Typography variant={'medium-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello World</Typography>
      <Typography variant={'regular-text-14'} font={'roboto'} as={'div'} className={s.spanColor}>Hello World</Typography>
      <Typography asChild={true}><h1>hello world</h1></Typography>

      {/*<MyDatePicker />*/}
      <TestPicker />
      <Inputt />
      {/*<DayPicker/>*/}
    </>
    )
}


