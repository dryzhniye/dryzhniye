'use client'
import {useDeletePostMutation, useLikePostMutation, useUpdatePostMutation} from '@/shared/api/postApi'
import { Button } from '@/shared/ui/base/Button/Button'
import Comment from '@/shared/ui/CardPosts/PostList/Comment'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './PostList.module.scss'
import { PostType } from '@/shared/lib/types/postsTypes'
import { useAddCommentMutation, useGetPostCommentsQuery } from '@/shared/api/commentsApi'
import { UserHeader } from '@/shared/ui/UserHeader/UserHeader'

type Props = {
  post: PostType
  onCloseModal: () => void
}

type ModalType = 'deletePost' | 'unsavedChanges' | null

export const PostList = ({ post, onCloseModal }: Props) => {
  const [modalType, setModalType] = useState<ModalType>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState<string>('')

  // Редактирование описания
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(post.description)
  const [updatePost] = useUpdatePostMutation()

  const handleEditPost = () => {
    setIsEditing(true)
    setEditedDescription(post.description)
    setIsMenuOpen(false)
  }

  const handleSaveEdit = async () => {
    try {
      await updatePost({ postId: post.id, description: editedDescription }).unwrap()
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }
  //

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
  const handleDeletePost = async () => {
    try {
      await deletePost(post.id).unwrap()
      onCloseModal()
    } catch (error) {
      console.error('Failed to delete PostItem:', error)
    } finally {
      setModalType(null)
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
      {isEditing ? (
          <div className={s.editPostWrap}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <UserHeader userId={post.ownerId} imageUrl={post.avatarOwner} />
              <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setModalType('unsavedChanges')}>
                <Image src={'/closeIcon.svg'} alt={'Close'} width={24} height={24} />
              </button>
            </div>

            <div className={s.editPostForm}>
              <span style={{opacity: '0.5'}}>Add publication descriptions</span>
              <textarea
                  className={s.editInput}
                  value={editedDescription}
                  onChange={e => setEditedDescription(e.currentTarget.value)}
                  maxLength={500}
              />
            </div>

            <button className={s.saveChangesBtn} onClick={handleSaveEdit}>
              Save Changes
            </button>
          </div>
      ) : (
        <>
          <div className={s.header}>
            <UserHeader userId={post.ownerId} imageUrl={post.avatarOwner} />
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
                    setModalType('deletePost')
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
            <p className={s.postDescription}>{post.description}</p>
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
        </>
      )}
      {modalType && (
          <Modal open onClose={() => setModalType(null)} modalTitle={modalType === 'deletePost' ? 'Delete Post' : 'Close Post'} className={s.modal}>
            {modalType === 'deletePost' && (
                <>
                  <p>Are you sure you want to delete this post?</p>
                  <div className={`${s.buttonGroup} ${s.buttonGroup_end}`}>
                    <Button variant="outlined" title="Yes" onClick={handleDeletePost} />
                    <Button variant="primary" title="No" onClick={() => setModalType(null)} />
                  </div>
                </>
            )}
            {modalType === 'unsavedChanges' && (
                <>
                  <p>Do you really want to close the edition of the publication? If you close changes won’t be saved</p>
                  <div className={`${s.buttonGroup} ${s.buttonGroup_end}`}>
                    <Button variant="outlined" title="Yes" onClick={() => {
                      setModalType(null)
                      setIsEditing(false)
                    }} />
                    <Button variant="primary" title="No" onClick={() => setModalType(null)} />
                  </div>
                </>
            )}
          </Modal>
      )}
    </div>
  )
}
