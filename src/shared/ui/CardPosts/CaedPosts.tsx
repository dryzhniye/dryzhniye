'use client'

import ImageSlider from '@/shared/ui/CardPosts/ImageSlider.'
import PostList from '@/shared/ui/CardPosts/PostList/PostList'
import styles from './CardPosts.module.scss'

type CardPostsProps = {
  post: {
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
  return (
    <div className={styles.myPost}>
      <div className={styles.slider}>
        <ImageSlider images={post.images} />
      </div>
      <div className={styles.details}>
        <PostList />
      </div>
    </div>
  )
}

export default CardPosts
