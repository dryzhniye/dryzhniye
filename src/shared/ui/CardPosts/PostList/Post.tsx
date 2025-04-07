'use client'

import Image from 'next/image'
import s from './Post.module.scss'

type PostProps = {
  imageUrl: string
  description: string
  likes: number
  date: string
}

const Post: React.FC<PostProps> = ({ imageUrl, description, likes, date }) => {
  return (
    <div className={s.postContent}>
      {/* Изображение поста */}
      <Image src={imageUrl} alt="Post image" width={720} height={720} className={s.image} />

      {/* Описание, лайки, время */}
      <div className={s.content}>
        <p>{description}</p>
        <div className={s.timestamp}>{date}</div>
        <span>Like: {likes}</span>
        <span>Answer</span>
        <div className={s.actions}>
          <button>
            <Image src="/heart.svg" alt="Like" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
