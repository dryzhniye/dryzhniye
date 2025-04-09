'use client'

import ImageSlider from '@/shared/ui/CardPosts/ImageSlider.'
import PostList from '@/shared/ui/CardPosts/PostList/PostList'
import styles from './CardPosts.module.scss'

type CardPostsProps = {
  post?: {
    images: string[]
    description: string
    username: string
    likes: number
    comments: {
      user: string
      text: string
      timestamp: string
      answers?: { user: string; text: string; timestamp: string }[]
    }[]
    date: string
  }
}

const CardPosts: React.FC<CardPostsProps> = ({ post }) => {
  const mockPost = {
    images: ['/post1.jpg', '/post2.jpg', '/post3.jpg'],
    description: 'Описание поста...',
    username: 'username123',
    likes: 42,
    comments: [
      {
        user: 'Anna',
        text: 'Класс!',
        timestamp: '2025-04-09T12:34:00',
        answers: [
          {
            user: 'Lena',
            text: 'Спасибо!',
            timestamp: '2025-04-09T12:35:00',
          },
        ],
      },
    ],
    date: '2025-04-09',
  }
  const data = post || mockPost

  return (
    <div className={styles.myPost}>
      <div className={styles.slider}>
        <ImageSlider images={data.images} />
      </div>
      <div className={styles.details}>
        <PostList />
      </div>
    </div>
  )
}

export default CardPosts
