import { HomePage } from '@/shared/ui/HomePage/HomePage'

export default async function Home() {
  try {
    const usersResponse = await fetch('https://dryzhniye.ru/api/v1/public-user')
    const usersCount = await usersResponse.json()
    const postsResponse = await fetch('https://dryzhniye.ru/api/v1/public-posts/all?pageSize=4')
    const posts = await postsResponse.json()

    return (
      <HomePage usersCount={usersCount.totalCount} posts={posts}/>
    )
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return <div>Failed to load data. Please try again later.</div>
  }
}
