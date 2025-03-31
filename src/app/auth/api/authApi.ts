import { baseApi } from '@/app/baseApi'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dryzhniye.ru'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resetPassword: build.mutation<void, {email: string, recaptcha: string}>({
      query: (args) => ({
        url: 'auth/password-recovery',
        method: 'POST',
        body: {
          email: args.email,
          recaptcha: args.recaptcha,
          baseUrl
        },
      }),
    }),
  }),
})

export const {useResetPasswordMutation} = authApi