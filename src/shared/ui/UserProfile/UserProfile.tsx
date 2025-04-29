'use client'
import React, { useRef } from 'react'
import { ProfileTopbar } from '@/shared/ui/ProfileTopbar/ProfileTopbar'
import s from './UserProfile.module.scss'
import { PostItem } from '@/shared/ui/PostItem/PostItem'
import { PublicProfile } from '@/shared/lib/types/profileTypes'
import { CreatePostWindow } from '@/shared/ui/CreatePostWindow/CreatePostWindow'
import { CardPosts } from '@/shared/ui/CardPosts/CardPosts'
import { PostItemSkeleton } from '@/shared/ui/PostItem/PostItemSkeleton'
import { PostType } from '@/shared/lib/types/postsTypes'
import { LockKeyhole } from 'lucide-react'
import { useProfilePosts } from '@/shared/ui/UserProfile/useProfilePosts'
import { useProfileModals } from '@/shared/ui/UserProfile/useProfileModals'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

type Props = {
  profile: PublicProfile
  post: PostType | undefined
}

const UserProfile = ({ profile, post }: Props) => {
  const loaderRef = useRef<HTMLDivElement>(null)

  const {
    postsForRender,
    isLoading,
    isFetching,
    addNewPost,
    page,
    setPage,
    hasMorePosts,
    isLoggedIn,
    publicIsLoading,
  } = useProfilePosts(profile)

  const { isModalOpen, closeModalsHandler, postId } = useProfileModals()

  useInfiniteScroll(
    loaderRef,
    isFetching,
    hasMorePosts,
    () => setPage(page + 1)
  )

  return (
    <div className={s.profileContainer}>
      <ProfileTopbar profile={profile} />

      <div className={s.postsGridContainer}>
        <div className={s.postsGrid}>
          {postsForRender?.map((post) => (
            <PostItem key={post.id} post={post} />
          )) ?? <PostItemSkeleton />}
        </div>

        {!isLoggedIn && !publicIsLoading && (
          <div className={s.bottomFadeContainer}>
            <div className={s.fadeOverlay}></div>
            <div className={s.authNotice}>
              <p>Зарегистрируйтесь или войдите, чтобы посмотреть больше постов</p>
              <LockKeyhole className={s.lock} />
            </div>
          </div>
        )}

        <div ref={loaderRef} className={s.loaderContainer}>
          {(isLoading || isFetching) && <div className={s.loader}>Loading...</div>}
        </div>
      </div>

      <CreatePostWindow
        open={isModalOpen}
        onPostCreated={addNewPost}
        onCloseModal={closeModalsHandler}
      />

      {postId && post && (
        <CardPosts
          post={post}
          postId={postId}
          onCloseModal={closeModalsHandler}
        />
      )}
    </div>
  )
}

export default UserProfile