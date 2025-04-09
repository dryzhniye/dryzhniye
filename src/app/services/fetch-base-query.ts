'use client'

import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { getCookie, setCookie } from '@/shared/utils/cookieUtils'

const mutex = new Mutex()

export const baseQueryWithReAuth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {

  await mutex.waitForUnlock()

  const oauthProvider = getCookie('oauthProvider')

  function isRequest(args: string | FetchArgs, endpoint: string): boolean {
    if (typeof args === 'string') return args.endsWith(endpoint)
    if (typeof args === 'object') return args.url?.endsWith(endpoint) ?? false
    return false
  }

  const isMeRequest = isRequest(args, 'auth/me')
  const isLogoutRequest = isRequest(args, 'auth/logout')
  const isUpdateToken = isRequest(args, 'auth/update-tokens')

  const dynamicBaseUrl =
    oauthProvider === 'github' && (isMeRequest || isLogoutRequest || isUpdateToken)
        ? 'https://inctagram.work/api/v1/'
        : 'https://dryzhniye.ru/api/v1/';


  const dynamicBaseQuery = fetchBaseQuery({
    baseUrl: dynamicBaseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })


  let result = await dynamicBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await dynamicBaseQuery({ url: 'auth/update-tokens', method: 'POST'},
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken
          if (newAccessToken){
            setCookie('accessToken', newAccessToken.trim(), 7)
            result = await dynamicBaseQuery(args, api, extraOptions)
            if (typeof window !== 'undefined') {
              window.location.href = '/search'
            }
          }
        }
      } catch (e) {
        console.error('Token refresh failed:', e)
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
    }
  }

  return result
}
