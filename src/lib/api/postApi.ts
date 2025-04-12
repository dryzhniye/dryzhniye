import { baseApi } from '@/app/baseApi'
import {
  CreatePostArgs,
  type GetProfilePostsParams,
  getPublicPostsResponse,
  PostType, UploadPostImagesArgs,
  UploadPostImagesResponse,
} from '@/lib/types/postsTypes'
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
      query: (pageSize) => ({
        url: 'public-posts/all/{endCursorPostId}',
        params: {
          pageSize,
        },
      }),
    }),
    getProfilePosts: build.query<getPublicPostsResponse, GetProfilePostsParams>({
      query: (params) => ({
        url: `posts/${params.userName}`,
        params: {
          pageSize: params.pageSize || 8,
          pageNumber: params.pageNumber || 1,
          sortBy: params.sortBy,
          sortDirection: params.sortDirection || 'desc',
        },
      }),
    }),
    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: 'users/profile',
      }),
    }),
    createPost: build.mutation<PostType, CreatePostArgs>({
      query: ({ description, uploadIds }) => ({
        body: {
          childrenMetadata: uploadIds.map(uploadId => {
            return { uploadId }
          }),
          description,
        },
        method: 'POST',
        url: `/posts`,
      }),
    }),
    uploadImagesForPost: build.mutation<UploadPostImagesResponse, UploadPostImagesArgs>({
      query: ({ files }) => {
        const formData = new FormData()

        files.forEach(file => {
          formData.append('file', file)
        })

        return {
          body: formData,
          method: 'POST',
          url: `posts/image`,
        }
      },
    }),
  }),
})

export const { useDeletePostMutation, useGetPublicPostsQuery, useGetProfilePostsQuery, useGetProfileQuery, useUploadImagesForPostMutation, useCreatePostMutation } = postApi
