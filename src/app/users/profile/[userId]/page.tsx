import { notFound } from 'next/navigation'
import UserProfile from '@/shared/ui/UserProfile/UserProfile'
import type { PublicProfile } from '@/shared/lib/types/profileTypes'
import { cookies } from 'next/headers'
import { PostType } from '@/shared/lib/types/postsTypes'

type Props = {
  params: Promise<{ userId: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function PublicUserProfilePage({ params, searchParams }: Props) {
  const { userId } = await params
  const resolvedSearchParams = await searchParams
  const postId = resolvedSearchParams.postId

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const profileResponse = await fetch(`https://dryzhniye.ru/api/v1/public-user/profile/${userId}`)

    if (!profileResponse.ok) notFound()

    const profile: PublicProfile = await profileResponse.json()
    if (!profile?.userMetadata) notFound()

    let post: PostType | undefined
    if (postId) {
      const postResponse = await fetch(`https://dryzhniye.ru/api/v1/posts/id/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      post = await postResponse.json()
    }
    return <UserProfile profile={profile} post={post} postId={postId} />
  } catch (error) {
    console.error('Error fetching profile', error)
    notFound()
  }
}