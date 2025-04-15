import React from 'react'
import s from './UserHeader.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'

type Props = {
  imageUrl: string | undefined
  userId?: number
}

export const UserHeader = ({imageUrl, userId}: Props) => {
  const path = userId ? PATH.USERS.PROFILE_USERID(userId) : PATH.USERS.PROFILE

  return (
    <div className={s.author}>
      <Image
        src={imageUrl || '/avatar.svg'}
        alt="Post image"
        width={36}
        height={36}
        className={s.image}
      />
      <Link href={path} className={s.title}>
        URLProfiele
      </Link>
    </div>
  )
}