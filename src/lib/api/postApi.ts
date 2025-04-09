import { baseApi } from '@/app/baseApi'
import { getPublicPostsResponse } from '@/lib/types/postsTypes'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    getPublicPosts: build.query<getPublicPostsResponse, void>({
      query: () =>({
        url: 'public-posts/all/{endCursorPostId}',
        params: {
          pageSize: 4,
        }
      }),
    })
  }),
})

export const { useDeletePostMutation, useGetPublicPostsQuery } = postApi
