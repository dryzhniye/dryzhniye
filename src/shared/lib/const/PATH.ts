export const PATH = {
  MAIN: '/',
  AUTH: {
    LOGIN: '/auth/sign-in',
    SIGNUP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RECOVERY: '/auth/recovery',
    RECOVERY_RESENDING: '/auth/recovery-resending',
    PRIVACY_POLICY: '/auth/privacy-policy',
    REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: '/auth/registration-email-resending',
    TERMS_OF_SERVICE: '/auth/terms-of-service',
  },
  USERS: {
    PROFILE: '/users/profile',
    PROFILE_USERID: (userId: number) => `/users/profile/${userId}`,
    PROFILE_SETTINGS: (userId: number) => `/users/profile/${userId}/settings`,
    PROFILE_USERID_REGEX: /^\/users\/profile\/\d+$/
  },
  GITHUB: '/auth/callback/github',
}