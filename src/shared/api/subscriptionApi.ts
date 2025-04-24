import { baseApi } from '@/store/services/baseApi'
import {
  createPaymentRequest,
  CreateSubscriptionInput,
  CurrentSubscriptionResponse, Payment,
} from '@/shared/lib/types/subscriptionTypes'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation<{ url: string }, createPaymentRequest>({
      query: (body) => ({
        url: 'subscriptions',
        method: 'POST',
        body,
      }),
    }),
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
  useCreatePaymentMutation,
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionQuery,
  useCreateSubscriptionMutation,
  useGetMyPaymentsQuery,
  useGetSubscriptionCostsQuery,
} = subscriptionApi
