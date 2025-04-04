'use client'
import s from './registration-confirmation.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useConfirmationMutation } from '@/lib/api/authApi'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { RecoverySkeleton } from '@/app/auth/recovery/RecoverySkeleton'
import { useRedirectIfAuthorized } from '@/lib/hooks/useRedirectIfAuthorized'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [isInitialized, setIsInitialized] = useState(false)

  const [confirmRegistration] = useConfirmationMutation()
  useRedirectIfAuthorized()

  useEffect(() => {
    if (!code) {
      router.push('auth/sign-in')
    } else {
      confirmRegistration({ confirmationCode: code })
        .unwrap()
        .then(() => {
          setIsInitialized(true)
        })
        .catch(() => {
          router.push('/auth/registration-email-resending?email=')
        })
    }
  }, [code, confirmRegistration, router])

  if (!isInitialized) return <RecoverySkeleton />

  return (
    <div>
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
    </div>
  )
}

export default Page
