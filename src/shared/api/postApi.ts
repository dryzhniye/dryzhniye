import { baseApi } from '@/store/services/baseApi'
import {
  CreatePostArgs,
  type GetProfilePostsParams, type GetProfilePostsResponse, type GetProfilePublicPostsParams,
  GetPublicPostsResponse,
  PostType, UploadPostImagesArgs,
  UploadPostImagesResponse,
} from '@/shared/lib/types/postsTypes'
import type { GetProfileResponse } from '@/shared/lib/types/profileTypes'


export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfilePosts: build.query<GetProfilePostsResponse, GetProfilePostsParams>({
      query: (params) => ({
        url: `posts/${params.userName}`,
        params: {
          pageSize: params.pageSize || 8,
          pageNumber: params.pageNumber || 1,
          sortBy: params.sortBy,
          sortDirection: params.sortDirection || 'desc',
        },
      }),
      providesTags: ['Posts', 'Description'],
    }),
    getProfilePublicPosts: build.query<GetPublicPostsResponse, GetProfilePublicPostsParams>({
      query: (params) => ({
        url: `public-posts/user/${params.userId}/${params.endCursorPostId || ''}`,
        params: {
          pageSize: params.pageSize || 10,
          sortBy: params.sortBy,
          sortDirection: params.sortDirection || 'desc',
        },
      }),
      providesTags: ['Posts'],
    }),
    getPublicPosts: build.query<GetPublicPostsResponse, number>({
      query: (pageSize) => ({
        url: 'public-posts/all',
        params: {
          pageSize,
        },
      }),
    }),

    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: 'users/profile',
      }),
    }),

    deletePost: build.mutation<void, number>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts']
    }),
    getProfilePost: build.query<PostType, number>({
      query: (postId) => `posts/id/${postId}`,
      providesTags: (result, error, postId) => [
        { type: 'Posts', id: postId },
      ],
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
      invalidatesTags: ['Posts'],
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
    likePost: build.mutation<void, { postId: number, likeStatus: 'NONE' | 'LIKE' }>({
      query: ({ postId, likeStatus }) => ({
        url: `posts/${postId}/like-status`,
        method: 'PUT',
        body: {
          likeStatus,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Posts', id: arg.postId },
      ],
    }),
    updatePost: build.mutation<void, { postId: number; description: string }>({
      query: ({ postId, description }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: { description },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Posts', id: postId },
      ],
    }),
  }),
})

export const {
  useDeletePostMutation,
  useGetPublicPostsQuery,
  useGetProfilePostsQuery,
  useGetProfilePublicPostsQuery,
  useGetProfilePostQuery,
  useGetProfileQuery,
  useUploadImagesForPostMutation,
  useCreatePostMutation,
  useLikePostMutation,
  useUpdatePostMutation
} = postApi
