import { notFound } from 'next/navigation'
import UserProfile from '@/widgets/UserProfile/UserProfile'
import type { PublicProfile } from '@/lib/types/profileTypes'
import { cookies } from 'next/headers'
import { PostType } from '@/lib/types/postsTypes'

type Props = {
  params: { userId: string }
  searchParams: { postId?: string }
}

export default async function PublicUserProfilePage({ params: { userId }, searchParams: { postId } }: Props) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const res = await fetch(`https://dryzhniye.ru/api/v1/public-user/profile/${userId}`)
    const postResponse = await fetch(`https://dryzhniye.ru/api/v1/posts/id/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      notFound() // возвращает 404
    }

    const profile: PublicProfile = await res.json()
    if (!profile || !profile.userMetadata) {
      notFound()
    }

    const post: PostType = await postResponse.json()

    return <UserProfile profile={profile} post={post} postId={postId}/>
  } catch (error) {
    console.error('Error fetching profile:', error)
    notFound()
  }
}