'use client'
import { useDeletePostMutation, useLikePostMutation } from '@/lib/api/postApi'
import { Button } from '@/shared/ui/Button/Button'
import Comment from '@/shared/ui/CardPosts/PostList/Comment'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './PostList.module.scss'
import { PostType } from '@/lib/types/postsTypes'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'
import { useAddCommentMutation, useGetPostCommentsQuery } from '@/lib/api/commentsApi'

type Props = {
  post: PostType
  onOpenChange: (open: boolean) => void
}

export const PostList = ({ post, onOpenChange }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState<string>('')

  const [deletePost] = useDeletePostMutation()
  const [addComment] = useAddCommentMutation()
  const [likePost] = useLikePostMutation()
  const { data: comments } = useGetPostCommentsQuery(post.id)

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const handleEditPost = () => {
    console.log('Edit Post')
    setIsMenuOpen(false)
  }
  const handleDeletePost = async () => {
    try {
      await deletePost(post.id).unwrap()
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to delete PostItem:', error)
    } finally {
      setShowModal(false)
    }
  }

  const handleCommentSubmit = async () => {
    await addComment({ postId: post.id, content: comment })
    setComment('')
  }

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleMenu()
  }

  const handlePostLike = async () => {
    const currentLike = post.isLiked
    const likeStatus = currentLike ? 'NONE' : 'LIKE'
    await likePost({ postId: post.id, likeStatus })
  }
  return (
    <div className={s.postListWrapper}>
      <div className={s.header}>
        <div className={s.author}>
          <Image
            src={post.avatarOwner || '/avatar.svg'}
            alt="Post image"
            width={36}
            height={36}
            className={s.image}
          />
          <Link href={PATH.USERS.PROFILE_USERID(post.ownerId)} className={s.title}>
            URLProfiele
          </Link>
        </div>
        <button className={s.button} onClick={handleOptionsClick}>
          ...
        </button>
        {isMenuOpen && (
          <div ref={menuRef} className={s.dropdownMenu}>
            <button onClick={handleEditPost} className={s.menuButton}>
              <Image src={'/edit-2-outline.svg'} alt={'edit'} width={24} height={24} />
              Edit Post
            </button>
            <button
              className={s.menuButton}
              onClick={() => {
                setShowModal(true)
                setIsMenuOpen(false)
              }}
            >
              <Image src={'/trash-outline.svg'} alt={'trash'} width={24} height={24} />
              Delete Post
            </button>
          </div>
        )}
      </div>

      <div className={s.scrollableContent}>
        {comments?.items.map(comm => <Comment key={comm.id} comment={comm} />)}
      </div>

      <div className={s.infoStories}>
        <div className={s.infoStoriesIcons}>
          <div className={s.infoStoriesGroup}>
            <button className={s.button} onClick={handlePostLike}>
              <Image
                src={post.isLiked ? '/heart.svg' : '/heart-outline.svg'}
                alt="heart"
                width={24}
                height={24}
              />
            </button>
            <button className={s.button}>
              <Image src="/paper-plane-outline.svg" alt="plane" width={24} height={24} />
            </button>
          </div>
          <button className={s.button}>
            <Image src="/bookmark-outline.svg" alt="bookmar" width={24} height={24} />
          </button>
        </div>
        <div className={s.footerInfo}>
          <div className={s.footerAva}>
            <div className={s.avatarCarousel}>
              {post.avatarWhoLikes.map((ava, index) => (
                <Image
                  key={index}
                  src={ava}
                  alt="User avatar"
                  width={20}
                  height={20}
                  className={s.avatarSmall}
                />
              ))}
            </div>
            <div className={s.likeCount}>
              {post.likesCount} <p className={s.likeCountTitle}>&#34;Like&#34;</p>
            </div>
          </div>
        </div>
        <div className={s.date}>
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      <div className={s.commentInputWrapper}>
        <input
          type="text"
          placeholder="Add a Comment..."
          className={s.commentInput}
          value={comment}
          onChange={e => setComment(e.currentTarget.value)}
        />
        <button className={s.commentSubmit} onClick={handleCommentSubmit}>
          Publish
        </button>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          modalTitle={' Delete Post'}
          className={s.modal}
        >
          <p>Are you sure you want to delete this post?</p>
          <div className={s.Description}>
            <div className={`${s.buttonGroup} ${s.buttonGroup_end}`}>
              <Button variant={'outlined'} title={'Yes'} onClick={handleDeletePost} />
              <Button variant={'primary'} title={'No'} onClick={() => setShowModal(false)} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
