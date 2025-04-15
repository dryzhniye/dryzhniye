'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ProfileTopbar } from '@/widgets/ProfileTopbar/ProfileTopbar'
import s from './UserProfile.module.scss'
import { PostItem } from '@/widgets/PostItem/PostItem'
import { useGetProfilePostsQuery, useGetProfilePublicPostsQuery } from '@/lib/api/postApi'
import type { PublicProfile } from '@/lib/types/profileTypes'
import { CreatePostWindow } from '@/shared/ui/CreatePostWindow/CreatePostWindow'
import { useRouter, useSearchParams } from 'next/navigation'
import { CardPosts } from '@/shared/ui/CardPosts/CardPosts'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectIsLoggedIn } from '@/app/redux/appSlice'
import { PostItemSkeleton } from '@/widgets/PostItem/PostItemSkeleton'
import { PostType } from '@/lib/types/postsTypes'

type Props = {
  profile: PublicProfile
  post: PostType
  postId: string | undefined
}

const UserProfile = ({ profile, post }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const action = searchParams.get('action')
  const postId = Number(searchParams.get('postId'))
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

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
  }, { skip: !isLoggedIn })

  const pagesCount = data?.pagesCount

  const {
    data: publicData,
    isLoading: publicIsLoading,
  } = useGetProfilePublicPostsQuery({
    userId: profile.id,
    endCursorPostId: undefined,
    pageSize: 8,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }, { skip: isLoggedIn })

  useEffect(() => {
    if (action === 'create' && postId) {
      const url = new URL(window.location.href)
      url.searchParams.delete('action')
      window.history.replaceState(null, '', url.toString())
      setIsModalOpen(false)
    } else if (action === 'create') {
      setIsModalOpen(true)
    } else if (postId) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(false)
    }
  }, [action, postId])

  const closeModalsHandler = () => {
    setIsModalOpen(false)

    const params = new URLSearchParams(window.location.search)
    params.delete('postId')
    params.delete('action')
    const newUrl = `${window.location.pathname}?${params.toString()}`

    router.replace(newUrl)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagesCount) {
          setTimeout(() => {
            setPage(prev => {
              if (prev < pagesCount) {
                return prev + 1
              }
              return prev
            })
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

  const dataForRender = publicData?.items || data?.items

  const newPostId = Number(postId)

  return (
    <div className={s.profileContainer}>

      <ProfileTopbar profile={profile} />

      <div className={s.postsGridContainer}>
        <div className={s.postsGrid}>
          {dataForRender ? dataForRender.map((post) => (
            <PostItem key={post.id} post={post} />
          )) : <PostItemSkeleton />}
        </div>
        {!isLoggedIn && !publicIsLoading &&
          <div className={s.bottomFadeContainer}>
            <div className={s.fadeOverlay}></div>
            <div className={s.authNotice}>Зарегистируйтесь или войдите, чтобы посмотреть больше постов</div>
          </div>
        }
        <div ref={loaderRef} className={s.loaderContainer}>
          {isLoading || isFetching && <div className={s.loader}>Loading...</div>}
        </div>
      </div>
      <CreatePostWindow open={isModalOpen}
                        onCloseModal={closeModalsHandler} />
      {postId ?
        <CardPosts post={post} postId={newPostId} onCloseModal={closeModalsHandler} /> : ''}
    </div>
  )
}

export default UserProfile