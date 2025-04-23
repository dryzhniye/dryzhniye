export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: 'MONTHLY' | 'WEEKLY' | 'DAY'
  paymentType: 'STRIPE'
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
  typeSubscription: 'MONTHLY' | 'WEEKLY' | 'DAY'
  paymentType: 'STRIPE'
  amount: number
  baseUrl: string
}
