'use client'
import { Flex } from '@radix-ui/themes'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@/shared/ui/base/Button/Button'
import { useState } from 'react'
import Image from 'next/image'
import s from './Header.module.scss'
import { useMeQuery } from '@/shared/api/authApi'
import { PATH } from '@/shared/lib/const/PATH'
import Link from 'next/link'

type Props = {
  isLoggedIn: boolean
  notifications?: boolean
  countNotifications?: number
}

export const Header = ({ isLoggedIn, notifications, countNotifications }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('English')

  const { data } = useMeQuery()

  return (
    <>
      <Flex asChild>
        <header className={s.header}>
          <Link href={PATH.MAIN} style={{textDecoration: 'none'}}>
            <h1 style={{ color: 'var(--light-100)', fontSize: '26px' }}>Inctagram</h1>
          </Link>
          {isLoggedIn ? (
            <Flex align="center" gap="4">
              <button
                style={
                  {
                    '--notification-count': countNotifications ? `"${countNotifications}"` : ' ',
                  } as React.CSSProperties
                }
                className={` ${s.notifications} ${notifications ? s.box : ''}`}
              >
                <Image src={'/notification.svg'} alt={'Уведомление'} width={'18'} height={'20'} />
              </button>

              <Select
                options={['English', 'Russian']}
                onChange={setSelectedValue}
                isLanguage={true}
                selectedValue={selectedValue}
                width={'163px'}
              />
            </Flex>
          ) : (
            <div className={s.buttonsBlock}>
              <Select
                options={['English', 'Russian']}
                onChange={setSelectedValue}
                isLanguage={true}
                selectedValue={selectedValue}
                width={'163px'}
              />
              <Button title="Log in" variant={'link'} href={PATH.AUTH.LOGIN} asChild={'a'} />
              <Button
                title="Sign up"
                variant={'primary'}
                width={'110px'}
                asChild={'a'}
                href={PATH.AUTH.SIGNUP}
              />
            </div>
          )}
        </header>
      </Flex>
    </>
  )
}
