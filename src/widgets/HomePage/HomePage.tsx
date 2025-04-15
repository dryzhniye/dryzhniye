'use client'
import React, { useEffect, useRef } from 'react'
import s from './HomePage.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'
import { UserHeader } from '@/shared/ui/UserHeader/UserHeader'
import { formatTimeAgo } from '@/shared/utils/formatTimeAgo'
import { authApi, useGetTotalUsersCountQuery } from '@/lib/api/authApi'
import { postApi, useGetPublicPostsQuery } from '@/lib/api/postApi'
import { GetPublicPostsResponse } from '@/lib/types/postsTypes'
import { useAppDispatch } from '@/lib/hooks/appHooks'

type Props = {
  usersCount: number
  posts: GetPublicPostsResponse
}

export const HomePage = ({ usersCount, posts }: Props) => {
  const dispatch = useAppDispatch()

  const needInitPostsInStore = useRef(!!posts)
  const needInitCountInStore = useRef(!!usersCount)

  const { data } = useGetTotalUsersCountQuery(undefined, {
    skip: needInitCountInStore.current,
  })

  const { data: postsData } = useGetPublicPostsQuery(4, {
    skip: needInitPostsInStore.current,
  })

  useEffect(() => {
    if (needInitPostsInStore.current) {
      dispatch(
        postApi.util.upsertQueryData('getPublicPosts', 4, posts),
      )
      needInitPostsInStore.current = false
    }
  }, [posts])

  useEffect(() => {
    if (needInitCountInStore.current) {
      dispatch(
        authApi.util.upsertQueryData('getTotalUsersCount', undefined, { totalCount: usersCount }),
      )
      needInitCountInStore.current = false
    }
  }, [usersCount])

  useEffect(() => {
    return () => {
      dispatch(
        postApi.util.resetApiState(),
      )
    }
  }, [])

  const dataForRender = postsData?.items || posts.items
  const count = data?.totalCount || usersCount
  const totalCount = count.toString().padStart(6, '0')

  return (
    <div className={s.home}>
      <div className={s.counterBlock}>
        <h1 className={s.title}>Registered users:</h1>
        <div className={s.counter}>
          {totalCount?.split('').flatMap((digit, index, array) => [
            <span key={`digit-${index}`} className={s.number}>{digit}</span>,
            index < array.length - 1 && (
              <span key={`separator-${index}`} className={s.separator} />
            ),
          ])}
        </div>
      </div>
      <div className={s.postsBlock}>
        {dataForRender?.map((post) => <div key={post.id} className={s.post}>
          {post.images.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              {post.images.map((image) => (
                <SwiperSlide key={image.url}>
                  <Link href={PATH.USERS.PROFILE_USERID(post.ownerId) + '?postId=' + post.id}>
                    <img
                      className={s.photo}
                      src={image.url}
                      alt="post photo"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <UserHeader userId={post.ownerId} imageUrl={post.avatarOwner} />
          <div className={s.time}>{formatTimeAgo(post.createdAt)}</div>
          <p className={s.description}>{post.description}</p>
        </div>)}
      </div>
    </div>
  )
}