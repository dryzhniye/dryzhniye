'use client'

import { PostItem } from '@/widgets/post/PostItem'
import React from 'react'
import s from './page.module.scss'
import { ProfileTopbar } from '@/widgets/profile-topbar/profile-topbar'

const UserProfile = () => {
  const posts = [
    {
      id: 1,
      imageUrl: '/images/image_my_profile.png',
      description: 'Person with red hat',
      likes: 243,
      comments: 15,
      isVideo: false,
    },
    {
      id: 2,
      imageUrl: '/images/image_my_profile.png',
      description: 'Business team',
      likes: 187,
      comments: 9,
      isVideo: false,
    },
    {
      id: 3,
      imageUrl: '/images/image_my_profile.png',
      description: 'Group discussion',
      likes: 412,
      comments: 28,
      isVideo: true,
    },
    {
      id: 4,
      imageUrl: '/images/image_my_profile.png',
      description: 'Person with camera',
      likes: 156,
      comments: 7,
      isVideo: false,
    },
    {
      id: 5,
      imageUrl: '/images/image_my_profile.png',
      description: 'Mountain view',
      likes: 538,
      comments: 32,
      isVideo: false,
    },
    {
      id: 6,
      imageUrl: '/images/image_my_profile.png',
      description: 'Coffee and food',
      likes: 216,
      comments: 14,
      isVideo: true,
    },
    {
      id: 7,
      imageUrl: '/images/image_my_profile.png',
      description: 'Food ingredients',
      likes: 295,
      comments: 21,
      isVideo: false,
    },

  ]

  return (
    <>

      <div className={s.profileContainer}>
        <ProfileTopbar />
        <div className={s.postsGridContainer}>
          <div className={s.postsGrid}>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default UserProfile
