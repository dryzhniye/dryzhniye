export type PaymentType = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
export type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY'

export type createPaymentRequest = {
  typeSubscription: SubscriptionType
  paymentType: PaymentType
  amount: number
  baseUrl: string
}