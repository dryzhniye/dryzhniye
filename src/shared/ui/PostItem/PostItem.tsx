'use client'

import React from 'react';
import styles from './PostItem.module.scss';
import Image from 'next/image'
import type { PostType } from '@/shared/lib/types/postsTypes'
import Link from 'next/link';


interface Post {
    post: PostType
}

export const PostItem = ({ post }: Post) => {

  return (
    <div
      className={styles.postItem}
    >
      <div className={styles.imageContainer}>
        <Link href={`/users/profile/${post.ownerId}?postId=${post.id}`} >
          <img
            src={post.images.length > 0 ? post.images[0].url: ""}
            alt={post.description || 'Post image'}
            className={styles.postImage}
          />
        </Link>
      </div>

      {post.images.length > 1 && (
        <div className={styles.manyPostsIndicator}>
            <Image
            src={'/copy-outline.svg'}
            alt="many-posts"
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
};