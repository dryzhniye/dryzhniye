export type PaymentType = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
export type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY'

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

type Subscription = {
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

export type CreateSubscriptionInput = {
  typeSubscription: SubscriptionType
  paymentType: PaymentType
  amount: number
  baseUrl: string
}
