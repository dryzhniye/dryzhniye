'use client'
import s from './terms-of-service.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { TextExample } from '@/app/auth/terms-of-service/TextExample'
import { PATH } from '@/shared/lib/const/PATH'

export default function Page() {
  return (
    <>
      <Link href={PATH.AUTH.SIGNUP} className={s.link}>
        <Image src={'/arrow-left.svg'} alt="<-" width="24" height="24" />
        Back to Sign Up
      </Link>
      <div className={s.block}>
        <h1 className={s.title}>Terms of Service</h1>
        <TextExample />
      </div>
    </>
  )
}
