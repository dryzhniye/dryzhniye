'use client'
import Link from 'next/link'
import s from '@/app/auth/terms-of-service/terms-of-service.module.scss'
import Image from 'next/image'
import { TextExample } from '@/app/auth/terms-of-service/TextExample'
import { PATH } from '@/shared/const/PATH'

export default function Page() {
  return (
    <>
      <Link href={PATH.AUTH.SIGNUP} className={s.link}>
        <Image src={'/arrow-left.svg'} alt="<-" width="24" height="24" />
        Back to Sign Up
      </Link>
      <div className={s.block}>
        <h1 className={s.title}>Privacy Policy</h1>
        <TextExample />
      </div>
    </>
  )
}
