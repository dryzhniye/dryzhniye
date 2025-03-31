import { baseApi } from '@/app/baseApi'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dryzhniye.ru'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resetPassword: build.mutation<void, { email: string, recaptcha: string }>({
      query: (args) => ({
        url: 'auth/password-recovery',
        method: 'POST',
        body: {
          email: args.email,
          recaptcha: args.recaptcha,
          baseUrl,
        },
      }),
    }),
    checkRecoveryCode: build.mutation<void, string>({
      query: (code) => ({
        url: 'auth/check-recovery-code',
        method: 'POST',
        body: {
          recoveryCode: code,
        },
      }),
    }),
    resendRecoveryCode: build.mutation<void, string>({
      query: (email) => ({
        url: 'auth/password-recovery-resending',
        method: 'POST',
        body: {
          email,
          baseUrl,
        },
      }),
    }),
    createNewPassword: build.mutation({

    })
  }),
})

export const { useResetPasswordMutation, useCheckRecoveryCodeMutation, useResendRecoveryCodeMutation } = authApi