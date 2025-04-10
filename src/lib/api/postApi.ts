import { baseApi } from '@/app/baseApi'
import { getPublicPostsResponse } from '@/lib/types/postsTypes'

interface GetProfilePostsParams {
  userName: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface ProfileResponse {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: Array<{
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
  }>;
  createdAt: string;
}

interface GetProfilePostsResponse {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: Array<{
    id: number;
    userName: string;
    description: string;
    location: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
      uploadId: string;
    }>;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    avatarOwner: string;
    owner: {
      firstName: string;
      lastName: string;
    };
    likesCount: number;
    isLiked: boolean;
    avatarWhoLikes: boolean;
  }>;
}


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

    uploadImagePost: build.mutation<
      {
        images: {
          url: string
          width: number
          height: number
          fileSize: number
          createdAt: string
          uploadId: string
        }[]
      },
      File[]
    >({
      query: (files) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('file', file)
        })

        return {
          url: 'posts/image',
          method: 'POST',
          body: formData,
        }
      },
    }),

    // New: Create post
    createPost: build.mutation<
      any, // you can define the response shape if you want
      {
        description: string
        childrenMetadata: { uploadId: string }[]
      }
    >({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    getProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: 'users/profile',
      }),
    }),

  }),
})

export const { useDeletePostMutation, useGetPublicPostsQuery,  useGetProfilePostsQuery, useUploadImagePostMutation, useCreatePostMutation, useGetProfileQuery } = postApi
