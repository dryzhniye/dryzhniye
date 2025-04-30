import { baseApi } from '@/store/services/baseApi'
import type { FollowingsResponse, PublicUser } from '@/shared/lib/types/userFollowingsTypes'

export const usersApi = baseApi.injectEndpoints({
  endpoints: build => ({

    getUsers: build.query<
      FollowingsResponse<PublicUser>,
      { search?: string; pageSize?: number; pageNumber?: number; cursor?: number }
    >({
      query: ({ search, pageSize = 12, pageNumber, cursor }) => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (pageNumber !== undefined) params.append('pageNumber', String(pageNumber))
        if (cursor !== undefined) params.append('cursor', String(cursor))
        params.append('pageSize', String(pageSize))

        return {
          url: `/users?${params.toString()}`,
        }
      },
      providesTags: ['Users'],
    }),

    getUserByUsername: build.query<PublicUser, string>({
      query: (userName) => `/users/${userName}`,
      providesTags: ['Users'],
    }),

    followUser: build.mutation<void, { selectedUserId: number }>({
      query: ({ selectedUserId }) => ({
        url: '/users/following',
        method: 'POST',
        body: { selectedUserId },
      }),
      invalidatesTags: ['Users'],
    }),

    removeFollower: build.mutation<void, number>({
      query: (userId) => ({
        url: `/users/follower/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    getFollowers: build.query<
      FollowingsResponse<PublicUser>,
      { userName: string; search?: string; pageSize?: number; pageNumber?: number; cursor?: number }
    >({
      query: ({ userName, search, pageSize = 12, pageNumber, cursor }) => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (pageNumber !== undefined) params.append('pageNumber', String(pageNumber))
        if (cursor !== undefined) params.append('cursor', String(cursor))
        params.append('pageSize', String(pageSize))

        return {
          url: `/users/${userName}/followers?${params.toString()}`,
        }
      },
      providesTags: ['Users'],
    }),

    getFollowing: build.query<
      FollowingsResponse<PublicUser>,
      { userName: string; search?: string; pageSize?: number; pageNumber?: number; cursor?: number }
    >({
      query: ({ userName, search, pageSize = 12, pageNumber, cursor }) => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (pageNumber !== undefined) params.append('pageNumber', String(pageNumber))
        if (cursor !== undefined) params.append('cursor', String(cursor))
        params.append('pageSize', String(pageSize))

        return {
          url: `/users/${userName}/following?${params.toString()}`,
        }
      },
      providesTags: ['Users'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useGetUserByUsernameQuery,
  useFollowUserMutation,
  useRemoveFollowerMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = usersApi
