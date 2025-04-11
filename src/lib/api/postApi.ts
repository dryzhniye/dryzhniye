import { baseApi } from '@/app/baseApi'
import { type GetProfilePostsParams, getPublicPostsResponse } from '@/lib/types/postsTypes'
import type { GetProfileResponse } from '@/lib/types/profileTypes'




export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    getPublicPosts: build.query<getPublicPostsResponse, GetProfilePostsParams>({
      query: (pageSize) =>({
        url: 'public-posts/all/{endCursorPostId}',
        params: {
          pageSize
        }
      }),
    }),
    getProfilePosts: build.query<getPublicPostsResponse, GetProfilePostsParams>({
      query: (params) =>({
        url: `posts/${params.userName}`,
        params: {
          pageSize: params.pageSize || 8,
          pageNumber: params.pageNumber || 1,
          sortBy: params.sortBy,
          sortDirection: params.sortDirection || 'desc'
        }
      }),
    }),
    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: 'users/profile',
      }),
    }),

  }),
})

export const { useDeletePostMutation, useGetPublicPostsQuery,  useGetProfilePostsQuery, useGetProfileQuery } = postApi
