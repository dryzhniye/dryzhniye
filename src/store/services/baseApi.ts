import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/store/services/fetch-base-query'

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ['Auth', 'Posts', 'Comments', 'Description'],
})
