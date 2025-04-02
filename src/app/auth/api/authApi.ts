import { baseApi } from '@/app/baseApi'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dryzhniye.ru'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resetPassword: build.mutation<void, { email: string; recaptcha: string }>({
      query: args => ({
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
      query: code => ({
        url: 'auth/check-recovery-code',
        method: 'POST',
        body: {
          recoveryCode: code,
        },
      }),
    }),
    resendRecoveryCode: build.mutation<void, string>({
      query: email => ({
        url: 'auth/password-recovery-resending',
        method: 'POST',
        body: {
          email,
          baseUrl,
        },
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: args => ({
        url: 'auth/new-password',
        method: 'POST',
        body: args,
      }),
    }),
    registration: build.mutation<void, { userName: string; email: string; password: string }>({
      query: args => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...args, baseUrl },
      }),
    }),
    login: build.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: args => ({
        url: 'auth/login',
        method: 'POST',
        body: args,
      }),
    }),
    me: build.query<{ userId: number; userName: string; email: string; isBlocked: boolean }, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    confirmation: build.mutation<void, { confirmationCode: string }>({
      query: args => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { ...args },
      }),
    }),
    resetEmail: build.mutation<void, { email: string }>({
      query: args => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { ...args, baseUrl },
      }),
    }),
  }),
})

export const {
  useResetPasswordMutation,
  useCheckRecoveryCodeMutation,
  useResendRecoveryCodeMutation,
  useCreateNewPasswordMutation,
  useLoginMutation,
  useRegistrationMutation,
  useConfirmationMutation,
  useResetEmailMutation,
  useMeQuery,
} = authApi
