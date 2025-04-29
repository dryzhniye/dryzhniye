'use client'
import s from './signUp.module.scss'
import Input from '@/shared/ui/base/Input/Input'
import { CheckBox } from '@/shared/ui/base/CheckBox/CheckBox'
import { Button } from '@/shared/ui/base/Button/Button'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import Link from 'next/link'
import { PATH } from '@/shared/lib/const/PATH'
import { SocialAuth } from '@/shared/ui/SocialAuth/SocialAuth'
import { useRegisterForm } from '@/shared/lib/hooks/useRegisterForm'

function Page() {
  const [linkModal, setLinkModal] = useState<string | boolean>(false)

  const {
    register,
    handleSubmit,
    control,
    onSubmit,
    formState: { errors, isValid },
  } = useRegisterForm()

  return (
    <div>
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'var(--light-100)', fontSize: '20px' }}>Sign Up</h1>

        <SocialAuth/>

        <Input
          label={'Username'}
          placeholder={'Epam11'}
          width={'330px'}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label={'Email'}
          placeholder={'Epam@epam.com'}
          width={'330px'}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={'Password'}
          type={'password'}
          placeholder={'******************'}
          error={errors.password?.message}
          width={'330px'}
          {...register('password')}
        />

        <Input
          label={'Password confirmation'}
          type={'password'}
          placeholder={'******************'}
          error={errors.confirmPassword?.message}
          width={'330px'}
          {...register('confirmPassword')}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Controller
            control={control}
            {...register('rememberMe')}
            render={({ field }) => (
              <CheckBox checked={field.value} onChange={checked => field.onChange(checked)} />
            )}
          />
          <span style={{ color: 'var(--light-100)', fontSize: '12px' }}>
            I agree to the{' '}
            <Link href={PATH.AUTH.TERMS_OF_SERVICE} style={{ color: 'var(--accent-700)' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={PATH.AUTH.PRIVACY_POLICY} style={{ color: 'var(--accent-700)' }}>
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button title={'Sign Up'} fullWidth={true} type={'submit'} disabled={!isValid} />

        <p style={{ color: 'var(--light-100)', fontSize: '16px' }}>Do you have an account?</p>

        <Button title={'Sign In'} variant={'link'} asChild={'a'} className={s.button} href={PATH.AUTH.LOGIN}/>
      </form>
      <Modal open={!!linkModal} modalTitle={'Email sent'} onClose={() => setLinkModal(false)}>
        <p style={{ marginBottom: '20px' }}>
          We have sent a link to confirm your email to {linkModal}
        </p>
        <Button
          variant={'primary'}
          title={'OK'}
          onClick={() => setLinkModal(false)}
          width={'96px'}
        />
      </Modal>
    </div>
  )
}
export default Page
