import { baseApi } from '@/store/services/baseApi'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cancelAutoRenewal: build.mutation<void, void>({
      query: () => ({
        url: 'subscriptions/canceled-auto-renewal',
        method: 'POST',
      }),
    }),
  }),
})
export const { useCancelAutoRenewalMutation } = subscriptionApi
