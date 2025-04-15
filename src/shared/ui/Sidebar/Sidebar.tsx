'use client'
import { useLogoutMutation } from '@/lib/api/authApi'
import { Button } from '@/shared/ui/base/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import s from './Sidebar.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { selectAppEmail, selectUserId } from '@/app/redux/appSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/appHooks'
import { PATH } from '@/shared/const/PATH'
import { usePathname, useSearchParams } from 'next/navigation'
import { selectActiveItem, setActiveItem } from '@/app/redux/sidebarSlice'

type Props = {
  disabledIcon?: boolean
}

export const Sidebar = ({ disabledIcon }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const activeItem = useAppSelector(selectActiveItem)
  const [showModal, setShowModal] = useState(false)
  const [logout] = useLogoutMutation()
  const email = useAppSelector(selectAppEmail)
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    const currentPath = pathname
    const action = searchParams.get('action')

    if (action === 'create' && currentPath.startsWith('/users/profile/')) {
      dispatch(setActiveItem('create'))
      return
    }

    if (currentPath.startsWith('/users/profile')) {
      if (currentPath.match(/^\/users\/profile\/\d+$/)) {
        dispatch(setActiveItem('profile'))
        return
      }
      if (currentPath === PATH.USERS.PROFILE) {
        dispatch(setActiveItem('profile'))
        return
      }
    }

    if (currentPath === PATH.MAIN) {
      dispatch(setActiveItem('home'))
    } else if (currentPath.startsWith('/messenger')) {
      dispatch(setActiveItem('messenger'))
    } else if (currentPath.startsWith('/search')) {
      dispatch(setActiveItem('search'))
    }
  }, [pathname, searchParams, dispatch])

  const menuItems = [
    { id: 'home', name: 'Home', iconDefault: '/home.svg', iconActive: '/homeActive.svg', PATH: PATH.MAIN },
    {
      id: 'create',
      name: 'Create',
      iconDefault: '/create.svg',
      iconActive: '/createActive.svg',
      PATH: userId ? `${PATH.USERS.PROFILE_USERID(userId)}?action=create` : activeItem,
    },
    {
      id: 'profile',
      name: 'My Profile',
      iconDefault: '/profileIcon.svg',
      iconActive: '/profileActive.svg',
      PATH: PATH.USERS.PROFILE,
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

  const handleItemClick = (id: string) => {
    dispatch(setActiveItem(id))
  }

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      window.location.replace(PATH.AUTH.LOGIN)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setShowModal(false)
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
              onClick={() => handleItemClick(menuItem.id)}
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
              onClick={() => handleItemClick(menuItem.id)}
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
          <p>Are you sure you want to log out {email}?</p>
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