// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
//   ReactNode,
// } from 'react'
// import {
//   useCancelAutoRenewalMutation,
//   useCreatePaymentMutation,
//   useGetCurrentSubscriptionQuery,
// } from '@/shared/api/subscriptionApi'
// import { useGetProfileQuery } from '@/shared/api/profileApi'
// import { useSearchParams } from 'next/navigation'
// import {
//   PaymentType,
//   SubscriptionType,
//   createPaymentRequest,
//   Subscription,
// } from '@/shared/lib/types/subscriptionTypes'
//
// type PaymentResult = 'success' | 'failed' | null
//
// type AccountManagementContextType = {
//   subscription: Subscription | undefined
//   autoRenewalChecked: boolean
//   toggleAutoRenewal: () => void
//   selectedType: string
//   setSelectedType: (value: string) => void
//   selectedCost: SubscriptionType
//   handleCostChange: (value: string) => void
//   setSelectedPaymentType: (type: PaymentType) => void
//   setIsPaymentModalOpen: (value: boolean) => void
//   isPaymentModalOpen: boolean
//   isChecked: boolean
//   setIsChecked: (value: boolean) => void
//   isLoading: boolean
//   handleCreatePayment: () => void
//   isResultModalOpen: boolean
//   setIsResultModalOpen: (value: boolean) => void
//   paymentResult: PaymentResult
// }
//
// const AccountManagementContext = createContext<AccountManagementContextType | null>(null)
//
// export const AccountManagementProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedType, setSelectedType] = useState('1')
//   const [selectedCost, setSelectedCost] = useState<SubscriptionType>('DAY')
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
//   const [isChecked, setIsChecked] = useState(false)
//   const [paymentResult, setPaymentResult] = useState<PaymentResult>(null)
//   const [isResultModalOpen, setIsResultModalOpen] = useState(false)
//   const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('PAYPAL')
//
//   const { data: profileData } = useGetProfileQuery()
//   const [createPayment, { isLoading }] = useCreatePaymentMutation()
//   const [cancelAutoRenewal] = useCancelAutoRenewalMutation()
//   const { data: currentSubscription } = useGetCurrentSubscriptionQuery()
//   const subscription = currentSubscription?.data?.[0]
//
//   const [autoRenewalChecked, setAutoRenewalChecked] = useState(subscription?.autoRenewal ?? false)
//
//   const searchParams = useSearchParams()
//
//   // Обработка параметра в URL (успешная или неуспешная оплата)
//   useEffect(() => {
//     const successParam = searchParams.get('success')
//     if (successParam === 'true') {
//       setPaymentResult('success')
//       setIsResultModalOpen(true)
//     } else if (successParam === 'false') {
//       setPaymentResult('failed')
//       setIsResultModalOpen(true)
//     }
//   }, [searchParams])
//
//   // Автообновление при наличии подписки
//   useEffect(() => {
//     if (subscription) {
//       setAutoRenewalChecked(subscription.autoRenewal)
//       if (subscription.autoRenewal) {
//         setSelectedType('2')
//       } else {
//         const endDate = new Date(subscription.endDateOfSubscription)
//         const now = new Date()
//         setSelectedType(now > endDate ? '1' : '2')
//       }
//     }
//   }, [subscription])
//
//   const handleCostChange = (value: string) => {
//     setSelectedCost(value as SubscriptionType)
//   }
//   const toggleAutoRenewal = useCallback(async () => {
//     const newState = !autoRenewalChecked
//     setAutoRenewalChecked(newState)
//     try {
//       if (!newState) {
//         await cancelAutoRenewal().unwrap()
//       }
//     } catch (error) {
//       console.error('Failed to cancel auto-renewal:', error)
//       setAutoRenewalChecked(autoRenewalChecked)
//     }
//   }, [autoRenewalChecked, cancelAutoRenewal])
//
//   const handleCreatePayment = useCallback(async () => {
//     if (!profileData?.id) return
//
//     const amount =
//       selectedCost === 'DAY'
//         ? 10
//         : selectedCost === 'WEEKLY'
//         ? 50
//         : selectedCost === 'MONTHLY'
//         ? 100
//         : 0
//
//     const req: createPaymentRequest = {
//       typeSubscription: selectedCost,
//       paymentType: selectedPaymentType,
//       amount,
//       baseUrl: `${window.location.origin}/users/profile/${profileData.id}/settings?part=subscriptions`,
//     }
//
//     try {
//       const response = await createPayment(req).unwrap()
//       if (response?.url) {
//         window.location.href = response.url
//       }
//     } catch (e) {
//       console.error('Payment error:', e)
//       setPaymentResult('failed')
//       setIsResultModalOpen(true)
//     } finally {
//       setIsPaymentModalOpen(false)
//     }
//   }, [createPayment, selectedCost, selectedPaymentType, profileData?.id])
//   const value = useMemo(
//     () => ({
//       subscription,
//       autoRenewalChecked,
//       toggleAutoRenewal,
//       selectedType,
//       setSelectedType,
//       selectedCost,
//       handleCostChange,
//       setSelectedPaymentType,
//       setIsPaymentModalOpen,
//       isPaymentModalOpen,
//       isChecked,
//       setIsChecked,
//       isLoading,
//       handleCreatePayment,
//       isResultModalOpen,
//       setIsResultModalOpen,
//       paymentResult,
//     }),
//     [
//       subscription,
//       toggleAutoRenewal,
//       autoRenewalChecked,
//       selectedType,
//       selectedCost,
//       isPaymentModalOpen,
//       isChecked,
//       isLoading,
//       isResultModalOpen,
//       paymentResult,
//       handleCreatePayment,
//     ]
//   )
//
//   return (
//     <AccountManagementContext.Provider value={value}>{children}</AccountManagementContext.Provider>
//   )
// }
//
// export const useAccountManagementContext = () => {
//   const context = useContext(AccountManagementContext)
//   if (!context) {
//     throw new Error('useAccountManagementContext must be used within AccountManagementProvider')
//   }
//   return context
// }

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

const useAutoRenewal = (setSelectedType: any) => {
  const { data: currentSubscription } = useGetCurrentSubscriptionQuery()
  const subscription = currentSubscription?.data?.[0]
  const [autoRenewalChecked, setAutoRenewalChecked] = useState(true)

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

  return { autoRenewalChecked, subscription, setAutoRenewalChecked }
}

export const useAccountManagement = () => {
  const [selectedType, setSelectedType] = useState('1')
  const [selectedCost, setSelectedCost] = useState<SubscriptionType>('DAY')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  const { isResultModalOpen, setIsResultModalOpen, paymentResult, setPaymentResult } =
    usePaymentResult()

  const { handleCreatePayment, isLoading, setSelectedPaymentType } = useCreatePayment(
    setPaymentResult,
    selectedCost,
    setIsResultModalOpen,
    setIsPaymentModalOpen
  )
  const { autoRenewalChecked, subscription, setAutoRenewalChecked } =
    useAutoRenewal(setSelectedType)

  const handleCostChange = (value: string) => {
    setSelectedCost(value as SubscriptionType)
  }

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
