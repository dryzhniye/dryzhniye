import { baseApi } from '@/store/services/baseApi'
import { createPaymentRequest } from '@/shared/lib/types/subscriptionTypes'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation<{url: string}, createPaymentRequest>({
      query: (body) => ({
        url: 'subscriptions',
        method: 'POST',
        body
      })
    }),
    cancelAutoRenewal: build.mutation<void, void>({
      query: () => ({
        url: 'subscriptions/canceled-auto-renewal',
        method: 'POST',
      }),
    }),
  }),
})
export const { useCreatePaymentMutation, useCancelAutoRenewalMutation } = subscriptionApi
