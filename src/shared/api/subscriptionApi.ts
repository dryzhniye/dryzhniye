import type {
  CreateSubscriptionInput,
  CurrentSubscriptionResponse,
  Payment,
} from '@/shared/lib/types/subscriptionTypes'
import { baseApi } from '@/store/services/baseApi'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cancelAutoRenewal: build.mutation<void, void>({
      query: () => ({
        url: 'subscriptions/canceled-auto-renewal',
        method: 'POST',
      }),
      invalidatesTags: ['subscription'],
    }),
    getCurrentSubscription: build.query<CurrentSubscriptionResponse, void>({
      query: () => 'subscriptions/current-payment-subscriptions',
      providesTags: ['subscription'],
    }),
    createSubscription: build.mutation<{ url: string }, CreateSubscriptionInput>({
      query: body => ({
        url: 'subscriptions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['subscription'],
    }),
    getMyPayments: build.query<Payment[], void>({
      query: () => 'subscriptions/my-payments',
      providesTags: ['subscription'],
    }),
    getSubscriptionCosts: build.query<
      { data: { amount: number; typeDescription: string }[] },
      void
    >({
      query: () => 'subscriptions/cost-of-payment-subscriptions',
      providesTags: ['subscription'],
    }),
  }),
})

export const {
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionQuery,
  useCreateSubscriptionMutation,
  useGetMyPaymentsQuery,
  useGetSubscriptionCostsQuery,
} = subscriptionApi
