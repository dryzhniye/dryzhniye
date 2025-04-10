import React from 'react'
import styles from './ProfileTopbar.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'

export const ProfileTopbar = () => {
  return (

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {/*<img*/}
            {/*  src="/image_my_profile.png"*/}
            {/*  alt="Profile avatar"*/}
            {/*  className={styles.avatarImage}*/}
            {/*/>*/}
            <Image
              src="/image_my_profile.png"
              alt="Profile avatar"
              className={styles.avatarImage}
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.profileHeader}>
            <h1 className={styles.username}>URLProfile</h1>
            <Button title={'Profile Settings'} variant={'secondary'} width={'167px'}/>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2 218</span>
              <span className={styles.statLabel}>Following</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2 358</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2 764</span>
              <span className={styles.statLabel}>Publications</span>
            </div>
          </div>

          <div className={styles.bio}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco{' '}
              <a href="#" className={styles.bioLink}>
                laboris nisi ut aliquip ex ea commodo consequat.
              </a>
            </p>
          </div>

        </div>
      </div>
  )
}