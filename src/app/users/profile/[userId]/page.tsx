import { notFound } from 'next/navigation'
import UserProfile from '@/widgets/UserProfile/UserProfile'

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

type UserMetadata = {
  following: number
  followers: number
  publications: number
}

export type PublicProfile = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean
}

type Params = {
  userId: string
}

export default async function PublicUserProfilePage({ params }: { params: Params }) {
  // почему-то с обычной типизацией, не работает. Наверное из-за специфичной передачи userId
  const { userId } = params

  try {
    const res = await fetch(`https://dryzhniye.ru/api/v1/public-user/profile/${userId}`)

    console.log(res)

    if (!res.ok) {
      notFound() // возвращает 404
    }

    const profile: PublicProfile = await res.json()
    console.log(profile)
    if (!profile || !profile.userMetadata) {
      notFound()
    }

    return <UserProfile profile={profile} />
  } catch (error) {
    console.error('Error fetching profile:', error)
    notFound()
  }
}
