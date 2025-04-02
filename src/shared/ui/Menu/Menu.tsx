import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './Menu.module.scss'

type ImageType = {
  active: string
  inactive: string
  description: string
}

type ImagesType = {
  [key: string]: ImageType
}

type MenuProps = {
  /**
   * пропсы для демонстрации работы компоненты
   */
  pathname?: string
}

/**
 * в зависимости от роутинга страницы (в дальнейшем должен совпадать с реальным названием страницы) меняется активная иконка
 */
const images: ImagesType = {
  '/home': { active: '/home-active.svg', inactive: '/home-outline.svg', description: 'home page' },
  '/addPost': {
    active: '/addPost-active.svg',
    inactive: '/addPost-outline.svg',
    description: 'add post',
  },
  '/comments': {
    active: '/comment-active.svg',
    inactive: '/comment-outline.svg',
    description: 'comments',
  },
  '/search': {
    active: '/search-active.svg',
    inactive: '/search-outline.svg',
    description: 'search',
  },
  '/profiles': {
    active: '/profiles-active.svg',
    inactive: '/profiles-outline.svg',
    description: 'profile',
  },
}

export default function Menu({ pathname }: MenuProps) {
  const router = useRouter()
  // нужно для демо пропсов в дальнейшем значения будут браться из useRouter
  const currentPath = pathname || router.pathname

  return (
    <div className={s.wrapper}>
      {Object.keys(images).map(path => {
        const isActive = currentPath === path
        return (
          <Image
            key={path}
            src={isActive ? images[path].active : images[path].inactive}
            alt={path}
            width={24}
            height={24}
            onClick={() => router.push(path)}
            className={s.image}
          />
        )
      })}
    </div>
  )
}
