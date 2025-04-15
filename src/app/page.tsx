import { HomePage } from '@/widgets/HomePage/HomePage'

export default async function Home() {
  const usersResponse = await fetch('https://inctagram.work/api/v1/public-user')
  const usersCount = await usersResponse.json()
  const postsResponse = await fetch('https://inctagram.work/api/v1/public-posts/all?pageSize=4')
  const posts = await postsResponse.json()

  return (
    <HomePage usersCount={usersCount.totalCount} posts={posts}/>
  )
}
