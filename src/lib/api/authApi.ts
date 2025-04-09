import { baseApi } from '@/app/baseApi'
import { deleteCookie, setCookie } from '@/shared/utils/cookieUtils'
import { setAppEmail, setIsLoggedIn, setUserId } from '@/app/redux/appSlice'

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          setCookie('accessToken', response.data.accessToken.trim(), 7)

          await dispatch(authApi.endpoints.me.initiate())
        } catch (error) {
          throw error
        }
      },
    }),
    me: build.query<{ userId: number; userName: string; email: string; isBlocked: boolean }, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled

          if (response.data.email) {
            dispatch(setAppEmail(response.data.email))
            dispatch(setIsLoggedIn(true))
            dispatch(setUserId(response.data.userId))
          }
        } catch (error) {
          throw error
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        deleteCookie('accessToken')
        deleteCookie('oauthProvider')
        dispatch(setIsLoggedIn(false))
        dispatch(setAppEmail(null))
        dispatch(authApi.util.resetApiState())
      },
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
    googleLogin: build.mutation<{ accessToken: string; email: string }, { redirectUrl: string; code: string }>({
      query: ({ redirectUrl, code }) => ({
        url: 'auth/google/login',
        method: 'POST',
        body: {
          redirectUrl,
          code,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        await dispatch(authApi.endpoints.me.initiate())
      },
    }),
    getTotalUsersCount: build.query<{ totalCount: number }, void>({
      query: () => 'public-user',
    }),
  }),
})

export const {
  useResetPasswordMutation,
  useCheckRecoveryCodeMutation,
  useResendRecoveryCodeMutation,
  useCreateNewPasswordMutation,
  useLogoutMutation,
  useLoginMutation,
  useRegistrationMutation,
  useConfirmationMutation,
  useResetEmailMutation,
  useMeQuery,
  useGoogleLoginMutation,
  useGetTotalUsersCountQuery
} = authApi
