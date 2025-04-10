'use client'

import styles from './page.module.scss'
import { PublicProfile } from '@/app/(pages)/users/profile/[userId]/page'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectIsLoggedIn, selectUserId } from '@/app/redux/appSlice'
import { Button } from '@/shared/ui/Button/Button'

type Props = {
  profile: PublicProfile
}

const UserProfile = ({ profile }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const currentUserId = useAppSelector(selectUserId)
  const userId = profile.id

  const isCurrentUserProfile = currentUserId === Number(userId)
  const isCurrentImgProfile = profile.avatars[0]?.url

  return (
    <>
      <section className={styles.userProfile}>
        <div className={styles.profileHeader}>
          <img
            src={isCurrentImgProfile ? isCurrentImgProfile : '/noAvatar.png'}
            alt="User avatar"
            className={styles.avatar}
          />

          <div className={styles.profileInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 className={styles.username}>{profile.userName}</h1>
              {isLoggedIn && isCurrentUserProfile && (
                <Button title="Profile Settings" variant="secondary" width="170px" />
              )}
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <p className={styles.statCount}>{profile.userMetadata.following}</p>
                <p className={styles.statLabel}>Following</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statCount}>{profile.userMetadata.followers}</p>
                <p className={styles.statLabel}>Followers</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statCount}>{profile.userMetadata.publications}</p>
                <p className={styles.statLabel}>Publications</p>
              </div>
            </div>

            <p className={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco
              <a href="#" className={styles.bioLink}>
                laboris nisi ut aliquip ex ea commodo consequat.
              </a>
            </p>
          </div>
        </div>

        <div className={styles.gallery}>
          {profile.avatars.map((img, index) => (
            <img key={index} src={img.url} alt="" />
          ))}
        </div>
      </section>
    </>
  )
}

export default UserProfile
