import React from 'react'
import styles from './ProfileTopbar.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import { PublicProfile } from '@/app/users/profile/[userId]/page'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectIsLoggedIn, selectUserId } from '@/app/redux/appSlice'

type Props = {
  profile: PublicProfile
}

export const ProfileTopbar = ({ profile }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const currentUserId = useAppSelector(selectUserId)
  const userId = profile.id

  const isCurrentUserProfile = currentUserId === Number(userId)
  const isCurrentImgProfile = profile.avatars[0]?.url

  return (


    <div className={styles.profileContent}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <Image
            src={isCurrentImgProfile ? isCurrentImgProfile : '/noAvatar.png'}
            alt="Profile avatar"
            className={styles.avatarImage}
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.profileHeader}>
          <h1 className={styles.username}>{profile.userName}</h1>
          {isLoggedIn && isCurrentUserProfile && (
            <Button title="Profile Settings" variant="secondary" width="167px" />
          )}
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{profile.userMetadata.following}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{profile.userMetadata.followers}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{profile.userMetadata.publications}</span>
            <span className={styles.statLabel}>Publications</span>
          </div>
        </div>

        <div className={styles.bio}>
          {profile.aboutMe ? <p>{profile.aboutMe}</p> : <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco{' '}
            <a href="#" className={styles.bioLink}>
              laboris nisi ut aliquip ex ea commodo consequat.
            </a>
          </p>}
        </div>

      </div>
    </div>
  )
}