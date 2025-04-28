import { useGetProfileQuery } from '@/shared/api/profileApi'
import {
  useCancelAutoRenewalMutation,
  useCreatePaymentMutation,
  useGetCurrentSubscriptionQuery,
} from '@/shared/api/subscriptionApi'
import {
  createPaymentRequest,
  PaymentType,
  SubscriptionType,
} from '@/shared/lib/types/subscriptionTypes'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const usePaymentResult = () => {
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null)

  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const searchParams = useSearchParams()
  useEffect(() => {
    const successParam = searchParams.get('success')
    if (successParam === 'true') {
      setPaymentResult('success')
      setIsResultModalOpen(true)
    } else if (successParam === 'false') {
      setPaymentResult('failed')
      setIsResultModalOpen(true)
    }
  }, [searchParams])

  return {
    isResultModalOpen,
    setIsResultModalOpen,
    paymentResult,
    setPaymentResult,
  }
}

export const useCreatePayment = (
  setPaymentResult: any,
  selectedCost: any,
  setIsResultModalOpen: any,
  setIsPaymentModalOpen: any
) => {
  const { data: profileData } = useGetProfileQuery()
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('PAYPAL')
  const [createPayment, { isLoading }] = useCreatePaymentMutation()
  const handleCreatePayment = async () => {
    if (!profileData?.id) return

    let amount: number

    switch (selectedCost) {
      case 'DAY':
        amount = 10
        break
      case 'WEEKLY':
        amount = 50
        break
      case 'MONTHLY':
        amount = 100
        break
      default:
        amount = 0
    }

    const req: createPaymentRequest = {
      typeSubscription: selectedCost,
      paymentType: selectedPaymentType,
      amount,
      baseUrl: `${window.location.origin}/users/profile/${profileData.id}/settings?part=subscriptions`,
    }

    try {
      const response = await createPayment(req).unwrap()
      if (response?.url) {
        window.location.href = response.url
      }
    } catch (e) {
      console.error('Payment error:', e)
      setPaymentResult('failed')
      setIsResultModalOpen(true)
    } finally {
      setIsPaymentModalOpen(false)
    }
  }

  return { handleCreatePayment, isLoading, setSelectedPaymentType }
}

export const useAccountManagemnet = () => {
  const { data: currentSubscription } = useGetCurrentSubscriptionQuery()
  const subscription = currentSubscription?.data?.[0]
  const [selectedType, setSelectedType] = useState('1')
  const [selectedCost, setSelectedCost] = useState<SubscriptionType>('DAY')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const [isChecked, setIsChecked] = useState(false)
  const [autoRenewalChecked, setAutoRenewalChecked] = useState(subscription?.autoRenewal ?? false)

  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  const { isResultModalOpen, setIsResultModalOpen, paymentResult, setPaymentResult } =
    usePaymentResult()

  const { handleCreatePayment, isLoading, setSelectedPaymentType } = useCreatePayment(
    setPaymentResult,
    selectedCost,
    setIsResultModalOpen,
    setIsPaymentModalOpen
  )

  const handleCostChange = (value: string) => {
    setSelectedCost(value as SubscriptionType)
  }

  // Cсинхронизируем переключатель типов после удачной или неудачноц попытки оплатить
  useEffect(() => {
    if (subscription) {
      setAutoRenewalChecked(subscription.autoRenewal)
      if (subscription.autoRenewal) {
        setSelectedType('2')
      } else {
        const endDate = new Date(subscription.endDateOfSubscription)
        const now = new Date()
        if (now > endDate) {
          setSelectedType('1')
        } else {
          setSelectedType('2')
        }
      }
    }
  }, [subscription])

  const toggleAutoRenewal = async () => {
    const newAutoRenewalState = !autoRenewalChecked
    setAutoRenewalChecked(newAutoRenewalState)
    try {
      if (!newAutoRenewalState) {
        await cancelAutoRenewal().unwrap()
      }
    } catch (error) {
      console.error('Failed to cancel auto-renewal:', error)
      setAutoRenewalChecked(autoRenewalChecked)
    }
  }

  return {
    subscription,
    autoRenewalChecked,
    toggleAutoRenewal,
    setSelectedType,
    selectedType,
    handleCostChange,
    selectedCost,
    setSelectedPaymentType,
    setIsPaymentModalOpen,
    isPaymentModalOpen,
    isChecked,
    setIsChecked,
    isLoading,
    handleCreatePayment,
    isResultModalOpen,
    setIsResultModalOpen,
    paymentResult,
  }
}
