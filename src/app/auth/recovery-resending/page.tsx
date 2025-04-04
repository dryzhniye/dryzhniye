'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import s from './recovery-resending.module.scss'
import { useSearchParams } from 'next/navigation'
import { useResendRecoveryCodeMutation } from '@/app/auth/api/authApi'
import { Modal } from '@/shared/ui/Modal/Modal'
import { withAuthRedirect } from '@/lib/hooks/hoc/withAuthRedirect'

function RecoveryResending() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [resendRecoveryCode] = useResendRecoveryCodeMutation()
  const [showModal, setShowModal] = useState<string | null>(null)

  const resendCodeHandler = () => {
    if (email) {
      resendRecoveryCode(email).then(() => {
        setShowModal(email)
      })
    }
  }

  return (
    <div>
      <div className={s.mainBlock}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.label}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button
          className={s.button}
          title={'Resend link'}
          width={'100%'}
          onClick={resendCodeHandler}
        />
        <Image src={'/rafiki.svg'} alt={'rafiki'} width="473" height="353" />
      </div>
      <Modal
        open={!!showModal}
        onClose={() => setShowModal(null)}
        modalTitle={'Email sent'}
        width={'378px'}
        height={'228px'}
      >
        <p>We have sent a link to confirm your email to {showModal}</p>
        <div className={s.Description}>
          <div className={s.buttonGroup + ' ' + s.buttonGroupEnd}>
            <Button
              variant={'primary'}
              title={'OK'}
              onClick={() => setShowModal(null)}
              width={'96px'}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default withAuthRedirect(RecoveryResending)
