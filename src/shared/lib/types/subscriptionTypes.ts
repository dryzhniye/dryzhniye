export type PaymentType = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
export type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY'
export type PaymentResult = 'success' | 'failed' | null

export type createPaymentRequest = {
  typeSubscription: SubscriptionType
  paymentType: PaymentType
  amount: number
  baseUrl: string
}

export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: SubscriptionType
  paymentType: PaymentType
}

export type Subscription = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type CurrentSubscriptionResponse = {
  data: Subscription[]
  hasAutoRenewal: boolean
}
