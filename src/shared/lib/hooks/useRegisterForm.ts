import { useRegistrationMutation } from '@/shared/api/authApi'
import { formRegisterSchema, TFormRegisterValues } from '@/shared/lib/schemas/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorType } from '@/shared/lib/types/errorTypes'

export const useRegisterForm = () => {
  const [registration] = useRegistrationMutation()
  const [successEmail, setSuccessEmail] = useState<string | null>(null)

  const form = useForm<TFormRegisterValues>({
    mode: 'onChange',
    resolver: zodResolver(formRegisterSchema)
  })

  const onSubmit: SubmitHandler<TFormRegisterValues> = async (data) => {
    try {
      await registration({
        email: data.email,
        password: data.password,
        userName: data.firstName,
      }).unwrap()

      form.reset()
      setSuccessEmail(data.email)
      return true
    } catch (error) {
      const err = error as ErrorType
      if (err.data.statusCode === 400 && err.data.messages.length > 0) {
        const message = err.data.messages[0].message.toLowerCase()

        if (message.includes('username')) {
          form.setError('firstName', { message: err.data.messages[0].message })
        } else if (message.includes('email')) {
          form.setError('email', { message: err.data.messages[0].message })
        }
      }
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