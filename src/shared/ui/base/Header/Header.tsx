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
import { PopoverModal } from '@/shared/ui/PopoverModal/PopoverModal'
import type { Notification } from '@/shared/lib/types/wsTypes'
import { useMarkNotificationsAsReadMutation } from '@/shared/api/notificationsApi'
import { formatTimeAgo } from '@/shared/lib/utils/formatTimeAgo'

type Props = {
  isLoggedIn: boolean
  hasUnread?: boolean
  notifications: Notification[]
  countNotifications?: number
}

export const Header = ({ isLoggedIn, hasUnread, notifications, countNotifications }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('English')
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const {} = useMeQuery()
  const [markAsRead] = useMarkNotificationsAsReadMutation()

  const handleMarkAsRead = async () => {
    try {
      await markAsRead({ ids: notifications.map(n => n.id) }).unwrap();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleNotificationClick = () => {
    setIsPopoverOpen(prev => !prev)
  }
  const closeNotifications = () => {
    setIsPopoverOpen(false)
    if (hasUnread) {
      handleMarkAsRead()
    }
  }

  return (
    <>
      <Flex asChild>
        <header className={s.header}>
          <Link href={PATH.MAIN} style={{ textDecoration: 'none' }}>
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
                className={` ${s.notifications} ${hasUnread ? s.box : ''}`}
                onMouseDown={handleNotificationClick}
              >
                <Image src={'/notification.svg'} alt={'Уведомление'} width={'18'} height={'20'} />
              </button>
              <PopoverModal isOpen={isPopoverOpen} onClose={closeNotifications}>
                {notifications.map(n => {
                  return (
                    <div key={n.id} className={s.notificationItem}>
                      <div className={s.notificationHeader}>
                        <span className={s.notificationTitle}>Новое уведомление!</span>
                        {!n.isRead && <span className={s.notificationNew}>Новое</span>}
                      </div>
                      <div className={s.notificationText}>
                        {n.message}
                      </div>
                      <div className={s.notificationTime}>{formatTimeAgo(n.createdAt)}</div>
                    </div>
                  )
                })}

              </PopoverModal>

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
