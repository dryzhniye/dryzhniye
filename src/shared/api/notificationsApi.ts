import { baseApi } from '@/store/services/baseApi'
import type { GetNotificationsResponse } from '@/shared/lib/types/notificationsTypes'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query<
      GetNotificationsResponse,
      { cursor?: number; pageSize?: number; sortDirection?: 'asc' | 'desc'; isRead?: boolean }
    >({
      query: ({ cursor, pageSize = 10, sortDirection = 'desc', isRead }) => {
        const params = new URLSearchParams()
        if (cursor !== undefined) params.append('cursor', String(cursor))
        params.append('pageSize', String(pageSize))
        params.append('sortDirection', sortDirection)
        if (isRead !== undefined) params.append('isRead', String(isRead))

        return {
          url: `/notifications${cursor !== undefined ? `/${cursor}` : ''}?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Notifications'],
      // keepUnusedDataFor: 600,
    }),

    markNotificationsAsRead: build.mutation<void, { ids: number[] }>({
      query: ({ ids }) => ({
        url: '/notifications/mark-as-read',
        method: 'PUT',
        body: { ids },
      }),
      invalidatesTags: ['Notifications'],
    }),

    deleteNotification: build.mutation<void, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useLazyGetNotificationsQuery
} = notificationsApi
