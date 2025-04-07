import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://dryzhniye.ru/api/v1/',
      credentials: 'include',
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      },
    })(args, api, extraOptions)

    //handleError(api, result) добавить обработчик ошибок

    return result
  },
  endpoints: () => ({}),
  tagTypes: ['Auth'],
})
