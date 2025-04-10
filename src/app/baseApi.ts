import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/app/services/fetch-base-query'

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ['Auth','Posts'],
})
