'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PublicProfile } from '@/app/users/profile/[userId]/page'
import { ProfileTopbar } from '@/widgets/ProfileTopbar/ProfileTopbar'
import s from './UserProfile.module.scss'
import { PostItem } from '@/widgets/PostItem/PostItem'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectIsLoggedIn } from '@/app/redux/appSlice'
import { useGetProfilePostsQuery, useGetPublicPostsQuery } from '@/lib/api/postApi'
import type { PostType } from '@/lib/types/postsTypes'
import { CreatePostWindow } from '@/shared/ui/CreatePostWindow/CreatePostWindow'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/const/PATH'

type Props = {
  profile: PublicProfile
}

const UserProfile = ({ profile }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const searchParams = useSearchParams()
  const router = useRouter()

  const action = searchParams.get('action')

  const [page, setPage] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([])
  const loaderRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: profilePosts,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
  } = useGetProfilePostsQuery({
    userName: profile.userName,
    pageSize: 4,
    pageNumber: page,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }, {
    skip: !isLoggedIn,
  })

  const {
    data: publicPosts,
    isLoading: isLoadingPublic,
    isFetching: isFetchingPublic,
  } = useGetPublicPostsQuery(18, {
    skip: isLoggedIn,
  })
  const postsData = isLoggedIn ? profilePosts : publicPosts
  const isLoading = isLoggedIn ? isLoadingProfile : isLoadingPublic
  const isFetching = isLoggedIn ? isFetchingProfile : isFetchingPublic

  useEffect(() => {
    if (action === 'create') {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [action])

  const closeModalHandler = (value: boolean) => {
    setIsModalOpen(value)
    router.push(PATH.USERS.PROFILE)
  }

  useEffect(() => {
    if (postsData?.items) {
      setDisplayedPosts(prev => [...prev, ...postsData.items])
    }
  }, [postsData])

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
                        onOpenChange={closeModalHandler} />
    </div>
  )
}

export default UserProfile