'use client'
import { Flex, Heading } from '@radix-ui/themes'
import { Select } from '@/shared/ui/Select/Select'
import { Button } from '@/shared/ui/Button/Button'
import { useState } from 'react'
import Image from 'next/image'
import s from './Header.module.scss'
import Link from 'next/link'

type Props = {
  isLoggedIn: boolean
  notifications?: boolean
  countNotifications?: number
}

export const Header = ({ isLoggedIn, notifications, countNotifications }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('English')

  return (
    <>
      <Flex asChild>
        <header className={s.header}>
          <Heading size="4" style={{ color: 'var(--light-100)' }}>
            Inctagram
          </Heading>

          {isLoggedIn ? (
            <Flex align="center" gap="3">
              <Select
                options={['English', 'Russian']}
                onChange={setSelectedValue}
                isLanguage={true}
                selectedValue={selectedValue}
                width={'163px'}
              />
              <Button title="Log in" variant={'link'} href={'/'} asChild={'a'} />
              <Link href={'/privacy-policy'}>
                <Button title="Sign up" variant={'primary'} width={'110px'} />
              </Link>
            </Flex>
          ) : (
            <Flex align="center" gap="4">
              <button
                style={
                  {
                    '--notification-count': countNotifications ? `"${countNotifications}"` : ' ',
                  } as React.CSSProperties
                }
                className={` ${s.notifications} ${notifications ? s.box : ''}`}
              >
                {/*todo: добавить точки, если больше 10*/}
                <Image src={'notification.svg'} alt={'Уведомление'} width={'18'} height={'20'} />
              </button>

              <Select
                options={['English', 'Russian']}
                onChange={setSelectedValue}
                isLanguage={true}
                selectedValue={selectedValue}
                width={'163px'}
              />
            </Flex>
          )}
        </header>
      </Flex>
    </>
  )
}
