'use client'

import { Button } from '@/shared/ui/Button/Button'
import { Header } from '@/shared/ui/Header/Header'
import s from './registration-confirmation.module.scss'
import Image from 'next/image'
import { useConfirmationMutation } from '@/app/auth/api/authApi'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [confirmRegistration] = useConfirmationMutation()

  useEffect(() => {
    if (!code) return

    confirmRegistration({ confirmationCode: code })
      .unwrap()
      .then(() => {
        // setTimeout(() => router.push('/sign-in'), 10000) // редирект через 10 сек, если пользователь неактивен
      })
      .catch(error => {
        console.log('error:', error)
      })
  }, [code, confirmRegistration, router])

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className={s.container}>
        <h1>Congratulations!</h1>
        <p className={s.text}>Your email has been confirmed</p>
        <Button title={'Sign In'} />
        <Image
          src={'/congratulations.png'}
          alt={''}
          width={432}
          height={300}
          style={{ marginTop: '72px' }}
        />
      </div>
    </div>
  )
}

export default Page
