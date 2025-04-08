'use client'
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { getCookie } from '@/shared/utils/cookieUtils'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/v1/',
  credentials: 'include',

  prepareHeaders: (headers) => {
    const token = getCookie('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      result = await baseQuery(args, api, extraOptions)
      release()

    } else {
      await mutex.waitForUnlock()
    }
  }

  return result
}
