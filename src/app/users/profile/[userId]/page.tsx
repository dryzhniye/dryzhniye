import { notFound } from 'next/navigation'
import UserProfile from '@/shared/ui/UserProfile/UserProfile'
import type { PublicProfile } from '@/shared/lib/types/profileTypes'
import { cookies } from 'next/headers'
import { PostType } from '@/shared/lib/types/postsTypes'

type PageParams = {
  params: {
    userId: string
  }
  searchParams: {
    postId?: string
  }
}

export default async function PublicUserProfilePage(props: PageParams) {
  const { userId } = props.params
  const { postId } = props.searchParams

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const profileResponse = await fetch(`https://dryzhniye.ru/api/v1/public-user/profile/${userId}`)

    if (!profileResponse.ok) {
      notFound()
    }

    const profile: PublicProfile = await profileResponse.json()
    if (!profile?.userMetadata) {
      notFound()
    }

    let post: PostType | undefined
    if (postId) {
      const postResponse = await fetch(`https://dryzhniye.ru/api/v1/posts/id/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (postResponse.ok) {
        post = await postResponse.json()
      }
    }

    return <UserProfile profile={profile} post={post} postId={postId} />
  } catch (error) {
    console.error('Error fetching profile:', error)
    notFound()
  }
}