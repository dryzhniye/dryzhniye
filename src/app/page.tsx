'use client'
import { useGetTotalUsersCountQuery } from '@/lib/api/authApi'
import { useGetPublicPostsQuery } from '@/lib/api/postApi'
import s from './page.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'
import { formatTimeAgo } from '@/shared/utils/formatTimeAgo'

export default function Home() {
  const { data } = useGetTotalUsersCountQuery()
  const { data: postsData } = useGetPublicPostsQuery(4)

  const totalCount = data?.totalCount.toString().padStart(6, '0')

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
        {postsData?.items.map((post) => <div key={post.id} className={s.post}>
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
          <div className={s.author}>
            <img className={s.avatar} src={post.avatarOwner} alt="" />
            <Link className={s.title} href={PATH.USERS.PROFILE_USERID(post.ownerId)}>URLProfile</Link>
          </div>
          <div className={s.time}>{formatTimeAgo(post.createdAt)}</div>
          <p className={s.description}>{post.description}</p>
        </div>)}
      </div>
    </div>
  )
}
