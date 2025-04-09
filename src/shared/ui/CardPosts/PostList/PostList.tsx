'use client'

import Post from '@/shared/ui/CardPosts/PostList/Post'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './PostList.module.scss'

const mockPosts = [
  {
    id: 1,
    userName: 'Alex',
    description:
      'description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.',
    location: 'location',
    images: [
      {
        url: '/google.svg',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-04-02T06:32:49.111Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-04-02T06:32:49.419Z',
    updatedAt: '2025-04-02T06:32:49.419Z',
    ownerId: 1,
    avatarOwner: '/google.svg',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 1,
    isLiked: true,
    avatarWhoLikes: ['/google.svg', '/google.svg', '/google.svg', '/google.svg'],
  },
  {
    id: 2,
    userName: 'Alex',
    description:
      'description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.description URLProfiele Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua.',
    location: 'location',
    images: [
      {
        url: '/google.svg',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-04-02T06:32:49.111Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-04-02T06:32:49.419Z',
    updatedAt: '2025-04-02T06:32:49.419Z',
    ownerId: 1,
    avatarOwner: '/google.svg',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 100,
    isLiked: true,
    avatarWhoLikes: ['/google.svg', '/google.svg', '/google.svg'],
  },
]

const PostList = () => {
  const posts = mockPosts
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})
  const [comment, setComment] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
  const handleDeletePost = () => {
    console.log('delete Post')
    setIsMenuOpen(false)
  }

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleMenu()
  }
  const toggleAnswers = (index: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = () => {
    // Здесь можно обработать отправку комментария
    console.log('Comment submitted:', comment)
    setComment('')
  }

  if (!posts || posts.length === 0) return <p>No posts found</p>

  return (
    <div className={s.postListWrapper}>
      <div className={s.header}>
        <div className={s.name}>
          <Image src="/google.svg" alt="Post image" width={20} height={20} className={s.image} />
          <h3>URLProfiele</h3>
        </div>
        <button onClick={handleOptionsClick}>
          <span>...</span>
        </button>
        {isMenuOpen && (
          <div ref={menuRef} className={s.dropdownMenu}>
            <button onClick={handleEditPost}>
              <Image src={'/edit-2-outline.svg'} alt={'edit'} width={24} height={24} />
              Edit Post
            </button>
            <button onClick={handleDeletePost}>
              <Image src={'/trash-outline.svg'} alt={'trash'} width={24} height={24} />
              Delete Post
            </button>
          </div>
        )}
      </div>
      <hr className={s.separator} />

      <div className={s.scrollableContent}>
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            imageUrl={post.images[0]?.url || ''}
            description={post.description}
            likes={post.likesCount}
            date={new Date(post.createdAt).toLocaleString()}
            avatarOwner={post.avatarOwner}
            owner={post.owner}
          />
        ))}
      </div>

      <hr className={s.separator} />

      <div className={s.infoStories}>
        <div className={s.infoStoriesIcone}>
          <div>
            <button>
              <Image src="/heart-outline.svg" alt="heart" width={20} height={20} />
            </button>
            <button>
              <Image src="/paper-plane-outline.svg" alt="plane" width={20} height={20} />
            </button>
          </div>
          <button>
            <Image src="/bookmark-outline.svg" alt="bookmar" width={20} height={20} />
          </button>
        </div>
        <div className={s.footerInfo}>
          <div className={s.footerAva}>
            <div>
              {mockPosts[0].avatarWhoLikes &&
                mockPosts[0].avatarWhoLikes.map((ava, index) => (
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
              {mockPosts[0].likesCount} <span>Like</span>
            </div>
          </div>
        </div>
        <div className={s.date}>{new Date(mockPosts[0].createdAt).toLocaleDateString()}</div>
      </div>

      <div className={s.commentInputWrapper}>
        <input
          type="text"
          placeholder="Add a Comment..."
          className={s.commentInput}
          value={comment}
          onChange={handleCommentChange}
        />
        <button className={s.commentSubmit} onClick={handleCommentSubmit}>
          Publish
        </button>
      </div>
    </div>
  )
}

export default PostList
