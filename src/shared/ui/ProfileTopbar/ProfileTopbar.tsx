import { useGetCurrentSubscriptionQuery } from '@/shared/api/subscriptionApi'
import React from 'react'
import styles from './ProfileTopbar.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/base/Button/Button'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { selectIsLoggedIn, selectUserId } from '@/store/slices/appSlice'
import type { PublicProfile } from '@/shared/lib/types/profileTypes'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/lib/const/PATH'

type Props = {
  profile: PublicProfile
}

export const ProfileTopbar = ({ profile }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const currentUserId = useAppSelector(selectUserId)
  const userId = profile.id

  const isCurrentUserProfile = currentUserId === Number(userId)
  const isCurrentImgProfile = profile.avatars[0]?.url

  const { data: currentSubscription } = useGetCurrentSubscriptionQuery()
  const subscription = currentSubscription?.data?.[0]

  const router = useRouter()

  const onSettingsClickHandler = () => {
    if (isCurrentUserProfile) {
      router.push(PATH.USERS.PROFILE_SETTINGS(userId))
    }
  }

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
          <h1 className={styles.username}>
            {profile.userName}
            {subscription && isCurrentUserProfile && (
              <Image
                src={'/Paid.svg'}
                alt="Subscription badge"
                width={24}
                height={24}
                className={styles.paid}
              />
            )}
          </h1>
          {isLoggedIn && isCurrentUserProfile ? (
            <Button
              title="Profile Settings"
              variant="secondary"
              width="167px"
              onClick={onSettingsClickHandler}
            />
          ) : <div style={{display: 'flex', gap: 12}}>
            <Button
              title="Follow"
              variant="primary"
              onClick={onSettingsClickHandler}
            />
            <Button
              title="Send Message"
              variant="secondary"
              onClick={onSettingsClickHandler}
            />
          </div>}

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
          {profile.aboutMe ? (
            <p>{profile.aboutMe}</p>
          ) : (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco{' '}
              <a href="#" className={styles.bioLink}>
                laboris nisi ut aliquip ex ea commodo consequat.
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
