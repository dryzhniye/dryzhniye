'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PublicProfile } from '@/app/users/profile/[userId]/page'
import { ProfileTopbar } from '@/widgets/ProfileTopbar/ProfileTopbar'
import s from './UserProfile.module.scss'
import { PostItem } from '@/widgets/PostItem/PostItem'
import { useGetProfilePostsQuery } from '@/lib/api/postApi'
import type { PostType } from '@/lib/types/postsTypes'
import { CreatePostWindow } from '@/shared/ui/CreatePostWindow/CreatePostWindow'
import { useRouter, useSearchParams } from 'next/navigation'
import { CardPosts } from '@/shared/ui/CardPosts/CardPosts'

type Props = {
  profile: PublicProfile
}

const UserProfile = ({ profile }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const action = searchParams.get('action')
  const postId = Number(searchParams.get('postId'))

  const [page, setPage] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([])
  const loaderRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPostOpen, setIsPostOpen] = useState(false)

  const {
    data,
    isLoading,
    isFetching,
  } = useGetProfilePostsQuery({
    userName: profile.userName,
    pageSize: 4,
    pageNumber: page,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(() => {
    if (action === 'create' && postId) {
      const url = new URL(window.location.href)
      url.searchParams.delete('action')
      window.history.replaceState(null, '', url.toString())
      setIsPostOpen(true)
      setIsModalOpen(false)
    } else if (action === 'create') {
      setIsModalOpen(true)
      setIsPostOpen(false)
    } else if (postId) {
      setIsPostOpen(true)
      setIsModalOpen(false)
    } else {
      setIsModalOpen(false)
      setIsPostOpen(false)
    }
  }, [action, postId])

  const closeModalsHandler = (value: boolean) => {
    setIsModalOpen(value)
    setIsPostOpen(value)

    const params = new URLSearchParams(window.location.search)
    params.delete('postId')
    params.delete('action')
    const newUrl = `${window.location.pathname}?${params.toString()}`

    router.replace(newUrl)
  }

  useEffect(() => {
    if (data?.items) {
      setDisplayedPosts(prev => [...prev, ...data.items])
    }
  }, [data])

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setPage(prevPage => prevPage + 1)
          }, 300)
        }
      },
      { threshold: 1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isLoading])

  return (
    <div className={s.profileContainer}>

      <ProfileTopbar profile={profile} />

      <div className={s.postsGridContainer}>
        <div className={s.postsGrid}>
          {displayedPosts ? displayedPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          )) : '...loading'}
        </div>
        <div ref={loaderRef} className={s.loaderContainer}>
          {isLoading || isFetching && <div className={s.loader}>Loading...</div>}
        </div>
      </div>
      <CreatePostWindow open={isModalOpen}
                        onOpenChange={closeModalsHandler} />
      {isPostOpen && postId && <CardPosts postId={postId} open={isPostOpen} onOpenChange={closeModalsHandler} />}
    </div>
  )
}

export default UserProfile