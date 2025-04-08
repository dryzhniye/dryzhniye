'use client'

import Image from 'next/image'
import { useState } from 'react'
import s from './Post.module.scss'

type PostProps = {
  id: number
  imageUrl: string
  description: string
  likes: number
  date: string
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
}

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  description,
  likes,
  date,
  avatarOwner,
  owner,
}) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = () => {
    setIsLiked(prev => !prev)
  }

  return (
    <div className={s.postContent}>
      <div className={s.header}>
        <Image src={avatarOwner} alt="User avatar" width={20} height={20} className={s.avatar} />
      </div>

      <div className={s.content}>
        <p className={s.description}>
          {' '}
          <span className={s.userName}>
            {owner.firstName} {owner.lastName}
          </span>
          {description}
        </p>
        <div className={s.info}>
          <div className={s.timestamp}>{date}</div>
          <span className={s.description}>Likes: {likes}</span>
          <button className={s.description}>Answer</button>
        </div>
      </div>

      <div className={s.actions}>
        <button onClick={handleLikeClick}>
          <Image
            src={isLiked ? '/heart.svg' : '/heart-outline.svg'}
            alt="Like"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  )
}

export default Post
