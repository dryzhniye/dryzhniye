import { useGetProfilePostsQuery, useGetProfilePublicPostsQuery } from '@/shared/api/postApi'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { selectIsLoggedIn } from '@/store/slices/appSlice'
import { useEffect, useState } from 'react'
import { PostType } from '@/shared/lib/types/postsTypes'

export const useProfilePosts = (profile: { userName: string; id: number }) => {
  const [page, setPage] = useState(1)
  const [postsForRender, setPostsForRender] = useState<PostType[]>([])
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data, isLoading, isFetching } = useGetProfilePostsQuery(
    {
      userName: profile.userName,
      pageSize: 4,
      pageNumber: page,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    },
    { skip: !isLoggedIn }
  )

  const { data: publicData, isLoading: publicIsLoading } = useGetProfilePublicPostsQuery(
    {
      userId: profile.id,
      endCursorPostId: undefined,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    },
    { skip: isLoggedIn }
  )

  const addNewPost = (newPost: PostType) => {
    setPostsForRender(prev => [newPost, ...prev])
  }

  useEffect(() => {
    if (data?.items) {
      setPostsForRender(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = data.items.filter(post => !existingIds.has(post.id))
        return [...prev, ...newItems]
      })
    }
  }, [data])

  useEffect(() => {
    if (!isLoggedIn && publicData?.items?.length) {
      setPostsForRender(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = publicData.items.filter(post => !existingIds.has(post.id))
        return [...prev, ...newItems]
      })
    }
  }, [publicData, isLoggedIn])

  return {
    postsForRender,
    isLoading: isLoading || publicIsLoading,
    isFetching,
    pagesCount: data?.pagesCount,
    addNewPost,
    page,
    setPage,
    hasMorePosts: page < (data?.pagesCount || 0),
    isLoggedIn,
    publicIsLoading,
  }
}