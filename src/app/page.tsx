'use client'
import { useGetTotalUsersCountQuery } from '@/lib/api/authApi'
import { useGetPublicPostsQuery } from '@/lib/api/postApi'
import s from './page.module.scss'

export default function Home() {
  const { data } = useGetTotalUsersCountQuery()
  const { data: postsData } = useGetPublicPostsQuery()

  const totalCount = data?.totalCount.toString().padStart(6, '0')

  return (
    <div className={s.home}>
      <div className={s.counterBlock}>
        <h1 className={s.title}>Registered users:</h1>
        <div className={s.counter}>{totalCount?.split('').map((digit, index) => (
          <>
            <span key={index} className={s.number}>{digit}</span>
            {index < 5 && <span className={s.separator} />}
          </>
        ))}</div>
      </div>
      <div className={s.postsBlock}>
        {postsData?.items.map((post) => <div key={post.id} className={s.post}>
          <div className={s.photo}>photo</div>
          <div>block title</div>
          <div>desc</div>
        </div>)}
      </div>
    </div>
  )
}
