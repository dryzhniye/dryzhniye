import { accountTypes, costs } from '@/shared/ui/AccountManagement/constants'
import { useAccountManagemnet } from '@/shared/ui/AccountManagement/hooks'
import { Button } from '@/shared/ui/base/Button/Button'
import { CheckBox } from '@/shared/ui/base/CheckBox/CheckBox'
import { Modal } from '@/shared/ui/Modal/Modal'
import { RadioGroupWind } from '@/shared/ui/RadioGroupWind/RadioGroupWind'
import Image from 'next/image'
import React from 'react'
import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const {
    subscription,
    autoRenewalChecked,
    toggleAutoRenewal,
    selectedType,
    setSelectedType,
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
  } = useAccountManagemnet()

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
