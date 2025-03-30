import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://dryzhniye.ru/api/v1/',
      prepareHeaders: headers => {
        // добавить токен
      },

    })(args, api, extraOptions)

    //handleError(api, result) добавить обработчик ошибок

    return result
  },
  endpoints: () => ({}),
  tagTypes: []
})