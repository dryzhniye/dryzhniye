'use client'

import React, { useState } from 'react';
import styles from './PostItem.module.scss';


export const PostItem = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.postItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img
          src={post.images.length > 0 ? post?.images[0].url: ""}
          alt={post?.description || 'Post image'}
          className={styles.postImage}
        />
      </div>

      {/*{isHovered && (*/}
      {/*  <div className={styles.overlay}>*/}
      {/*    <div className={styles.stats}>*/}
      {/*      {post.likes && (*/}
      {/*        <div className={styles.statItem}>*/}
      {/*          <span className={styles.statIcon}>❤️</span>*/}
      {/*          /!*<span className={styles.statCount}>{post.likes}</span>*!/*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*      {post.comments && (*/}
      {/*        <div className={styles.statItem}>*/}
      {/*          <span className={styles.statIcon}>💬</span>*/}
      {/*          /!*<span className={styles.statCount}>{post.comments}</span>*!/*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      {post?.images.length > 1 && (
        <div className={styles.videoIndicator}>
          <span className={styles.videoIcon}>▶️</span>
        </div>
      )}
    </div>
  );
};