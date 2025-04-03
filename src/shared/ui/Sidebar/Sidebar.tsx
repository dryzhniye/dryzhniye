'use client'
// import { useAppSelector } from '@/app/appHooks'
import { useLogoutMutation } from '@/app/auth/api/authApi'
import { Button } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useRouter } from 'next/navigation'
import s from './Sidebar.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
  disabledIcon?: boolean
}

const menuItems = [
  { id: 'home', name: 'Home', iconDefault: '/home.svg', iconActive: '/homeActive.svg', PATH: '' },
  {
    id: 'create',
    name: 'Create',
    iconDefault: '/create.svg',
    iconActive: '/createActive.svg',
    PATH: '',
  },
  {
    id: 'profile',
    name: 'My Profile',
    iconDefault: '/profileIcon.svg',
    iconActive: '/profileActive.svg',
    PATH: '',
  },
  {
    id: 'messenger',
    name: 'Messenger',
    iconDefault: '/message.svg',
    iconActive: '/messageActive.svg',
    PATH: '',
  },
  {
    id: 'search',
    name: 'Search',
    iconDefault: '/search.svg',
    iconActive: '/searchActive.svg',
    PATH: '',
  },
]

const menuItems2 = [
  {
    id: 'statistics',
    name: 'Statistics',
    iconDefault: '/statistics.svg',
    iconActive: '/statistics.svg',
    PATH: '',
  },
  {
    id: 'favorites',
    name: 'Favorites',
    iconDefault: '/favorites.svg',
    iconActive: '/favoritesActive.svg',
    PATH: '',
  },
]

export const Sidebar = ({ disabledIcon }: Props) => {
  const [activeItem, setActiveItem] = useState('home')
  const [showModal, setShowModal] = useState(false)
  const [logout] = useLogoutMutation()
  // const email = useAppSelector(state => state)
  const router = useRouter()

  const activeItems = (value: string) => {
    setActiveItem(value)
  }

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.push('/sign-in')
      // localStorage.removeItem(AUTH_TOKEN)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className={s.wrapperSidebar}>
      <nav style={{ flex: 1, width: '100%' }}>
        <ul className={s.wrap}>
          {menuItems.map(menuItem => (
            <li
              key={menuItem.id}
              className={`${s.wrapper} ${disabledIcon ? s.disabled : ''}`}
              onClick={() => activeItems(menuItem.id)}
            >
              <Image
                src={
                  (activeItem === menuItem.id ? menuItem.iconActive : menuItem.iconDefault) ??
                  '/public/home'
                }
                alt={menuItem.name}
                width={18}
                height={20}
                className={`${s.icon} ${activeItem === menuItem.id ? s.active : ''}`}
              />

              <Link
                href={menuItem.PATH}
                className={s.button}
                style={{ color: `${activeItem === menuItem.id ? 'var(--accent-700)' : ''}` }}
              >
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul style={{ marginTop: '60px' }} className={s.wrap}>
          {menuItems2.map(menuItem => (
            <li
              key={menuItem.id}
              className={`${s.wrapper} ${disabledIcon ? s.disabled : ''}`}
              onClick={() => activeItems(menuItem.id)}
            >
              <Image
                src={
                  (activeItem === menuItem.id ? menuItem.iconActive : menuItem.iconDefault) ??
                  '/home'
                }
                alt={menuItem.name}
                width={18}
                height={20}
                className={`${s.icon} ${activeItem === menuItem.id ? s.active : ''}`}
              />

              <Link
                href={menuItem.PATH}
                className={s.button}
                style={{ color: `${activeItem === menuItem.id ? 'var(--accent-700)' : ''}` }}
              >
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={() => setShowModal(true)} className={s.button}>
        <Image src={'/logoutActive.svg'} alt={''} width={'18'} height={'20'} className={s.icon} />
        Log Out
      </button>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)} modalTitle={'Log Out'}>
          <p>Are you sure you want to log out {'email'}?</p>
          <div className={s.Description}>
            <div className={`${s.buttonGroup} ${s.buttonGroup_end}`}>
              <Button variant={'outlined'} title={'Yes'} onClick={logoutHandler} />
              <Button variant={'primary'} title={'No'} onClick={() => setShowModal(false)} />
            </div>
          </div>
        </Modal>
      )}
    </aside>
  )
}
