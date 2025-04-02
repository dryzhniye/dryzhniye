'use client'

import s from './registration-confirmation.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Header } from '@/shared/ui/Header/Header'
import Image from 'next/image'
import { useConfirmationMutation } from '@/app/auth/api/authApi'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Error } from '@/app/auth/sign-up/page'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [error, setError] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const [confirmRegistration] = useConfirmationMutation()

  useEffect(() => {
    if (!code) return

    confirmRegistration({ confirmationCode: code })
      .unwrap()
      .then(() => {})
      .catch(error => {
        const err = error as Error
        setError(err.data.messages[0].message)
        setModal(true)
        console.log('error', err)
      })
  }, [code, confirmRegistration, router, error])

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className={s.container}>
        <h1>Congratulations!</h1>
        <p className={s.text}>Your email has been confirmed</p>
        <Link href={'/auth/sign-in'}>
          <Button title={'Sign In'} />
        </Link>
        <Image
          src={'/congratulations.png'}
          alt={''}
          width={432}
          height={300}
          style={{ marginTop: '72px' }}
        />
      </div>
      <Modal
        open={modal}
        modalTitle={'УПС!'}
        onClose={() => setModal(false)}
        style={{ zIndex: 999 }}
      >
        <p style={{ marginBottom: '20px' }}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Link href={'/auth/registration-email-resending'}>
          <Button
            variant={'primary'}
            title={'Resend verefication link'}
            onClick={() => setModal(false)}
            width={'250px'}
          />
        </Link>
      </Modal>
    </div>
  )
}

export default Page
