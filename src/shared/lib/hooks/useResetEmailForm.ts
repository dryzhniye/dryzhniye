import { useResetEmailMutation } from '@/shared/api/authApi'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type ResetEmailFormValues = {
  email: string
}

export const useResetEmailForm = () => {
  const [resetEmail] = useResetEmailMutation()
  const [successEmail, setSuccessEmail] = useState<string | null>(null)

  const form = useForm<ResetEmailFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<ResetEmailFormValues> = async (data) => {
    try {
      await resetEmail({ email: data.email }).unwrap()
      setSuccessEmail(data.email)
      form.reset()
      return true
    } catch (error) {
      console.error('Email reset error:', error)
      return false
    }
  }

  return {
    ...form,
    onSubmit,
    successEmail,
    setSuccessEmail,
  }
}