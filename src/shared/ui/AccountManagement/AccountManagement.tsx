import React, { useEffect, useState } from 'react'
import s from './AccountManagement.module.scss'
import { RadioGroupWind } from '@/shared/ui/RadioGroupWind/RadioGroupWind'
import Image from 'next/image'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CheckBox } from '@/shared/ui/base/CheckBox/CheckBox'
import { Button } from '@/shared/ui/base/Button/Button'
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
import { useGetProfileQuery } from '@/shared/api/profileApi'
import { useSearchParams } from 'next/navigation'

export const AccountManagement = () => {
  const accountTypes = [
    { value: '1', label: 'Personal' },
    { value: '2', label: 'Business' },
  ]
  const costs = [
    { value: 'DAY', label: '$10 per 1 Day' },
    { value: 'WEEKLY', label: '$50 per 7 Day' },
    {
      value: 'MONTHLY',
      label: '$100 per month',
    },
  ]

  const [selectedType, setSelectedType] = useState('1')
  const [selectedCost, setSelectedCost] = useState<SubscriptionType>('DAY')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [paymentResult, setPaymentResult] = useState<'success' | 'failed' | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [autoRenewalChecked, setAutoRenewalChecked] = useState(false)
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('PAYPAL')
  const { data: profileData } = useGetProfileQuery()
  const searchParams = useSearchParams()
  const { data: currentSubscription } = useGetCurrentSubscriptionQuery()
  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  const [createPayment, { isLoading }] = useCreatePaymentMutation()

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

  const handleCostChange = (value: string) => {
    setSelectedCost(value as SubscriptionType)
  }
  const subscription = currentSubscription?.data?.[currentSubscription?.data.length - 1]

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

  return (
    <>
      {subscription && (
        <div className={s.subscriptionontainer}>
          <h3 className={s.subscribtionTitle}>Current Subscription:</h3>
          <div className={s.infoBox}>
            <div>
              <p className={s.infoTitle}>Expire at:</p>
              <p className={s.infoDate}>
                {new Date(subscription.endDateOfSubscription).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className={s.infoTitle}>Next payment:</p>
              <p className={s.infoDate}>
                {new Date(subscription.dateOfPayment).toLocaleDateString()}
              </p>
            </div>
          </div>
          <CheckBox
            title={'Auto-Renewal'}
            checked={autoRenewalChecked}
            onChange={toggleAutoRenewal}
          />
        </div>
      )}
      <RadioGroupWind
        title={'Account type:'}
        onChange={setSelectedType}
        options={accountTypes}
        selectedValue={selectedType}
      />

      {selectedType === '2' && (
        <>
          <RadioGroupWind
            title={'Your subscription costs:'}
            onChange={handleCostChange}
            options={costs}
            selectedValue={selectedCost}
          />
          <div className={s.buttonsContainer}>
            <button
              className={s.button}
              onClick={() => {
                setSelectedPaymentType('PAYPAL')
                setIsPaymentModalOpen(true)
              }}
            >
              <Image src={'/paypal.svg'} alt={'PayPal'} width={72} height={48} />
            </button>
            <p>Or</p>
            <button
              className={s.button}
              onClick={() => {
                setSelectedPaymentType('STRIPE')
                setIsPaymentModalOpen(true)
              }}
            >
              <Image src={'/stripe.svg'} alt={'stripe'} width={70} height={30} />
            </button>
          </div>
        </>
      )}

      {isPaymentModalOpen && (
        <Modal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          modalTitle={'Create payment'}
          width={'378px'}
          height={'252px'}
        >
          <p className={s.title}>
            Auto-renewal will be enabled with this payment. You can disable it anytime in your
            profile settings
          </p>
          <div className={s.modalButtons}>
            <CheckBox title={'I agree'} checked={isChecked} onChange={setIsChecked} />
            <Button
              title={'OK'}
              width={'72px'}
              disabled={!isChecked || isLoading}
              onClick={handleCreatePayment}
            />
          </div>
        </Modal>
      )}

      {isResultModalOpen && (
        <Modal
          open={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          modalTitle={paymentResult === 'success' ? 'Success!' : 'Error'}
          width={'378px'}
          height={'252px'}
        >
          <div className={s.resultModal}>
            <p className={s.title}>
              {paymentResult === 'success'
                ? 'Payment was successful!'
                : 'Transaction failed. Please, write to support'}
            </p>
            <Button
              title={paymentResult === 'success' ? 'OK' : 'Back to payment'}
              width={'100%'}
              onClick={() => setIsResultModalOpen(false)}
              style={{ marginTop: '54px' }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
