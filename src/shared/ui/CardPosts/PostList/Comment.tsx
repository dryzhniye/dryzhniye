'use client'
import Image from 'next/image'
import s from './Comment.module.scss'
import { formatTimeAgo } from '@/shared/lib/utils/formatTimeAgo'
import { CommentType } from '@/shared/lib/types/commentTypes'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { selectUserId } from '@/store/slices/appSlice'

type Props = {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  const userId = useAppSelector(selectUserId)
  const isCommentOwner = userId === comment.from.id

  const handleLikeComment = async () => {

  }

  const handleAddCommentAnswer = () => {}

  const avatar = comment.from.avatars[0] || '/avatar.svg'

  return (
    <div className={s.postContent}>
      <Image src={avatar} alt="Post image" width={36} height={36} className={s.image} />

      <div className={s.content}>
        <p className={s.description}>
          <span className={s.userName}>
            {comment.from.username}
          </span>
          {comment.content}
        </p>
        <div className={s.info}>
          <div>{formatTimeAgo(comment.createdAt)}</div>
          {comment.likeCount > 0 && <span>Like: {comment.likeCount}</span>}
          {!isCommentOwner && <button onClick={handleAddCommentAnswer} className={s.answerButton}>Answer</button>}
        </div>
      </div>
      {!isCommentOwner && <button onClick={handleLikeComment} className={s.likeButton}>
        <Image
          src={comment.isLiked ? '/heart.svg' : '/heart-outline.svg'}
          alt="Like"
          width={20}
          height={20}
        />
      </button>}
    </div>
  )
}

export default Comment
