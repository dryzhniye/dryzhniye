import { useLoginMutation } from '@/shared/api/authApi'
import { useRouter } from 'next/navigation'
import { formLoginSchema, TFormLoginValues } from '@/shared/lib/schemas/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/const/PATH'
import { ErrorType } from '@/shared/lib/types/errorTypes'

export const useLoginForm = () => {
  const [login] = useLoginMutation()
  const router = useRouter()

  const form = useForm<TFormLoginValues>({
    mode: 'onChange',
    resolver: zodResolver(formLoginSchema),
  })

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap()

      router.push(PATH.USERS.PROFILE)
      return true
    } catch (error) {
      const err = error as ErrorType<string>

      if (err.data.statusCode === 400) {
        const errorMessage = err.data.messages
        if (errorMessage.includes('password or email')) {
          form.setError('email', { message: errorMessage })
          form.setError('password', { message: '' }) // Clear password error if needed
        }
      }

      if (err.data.statusCode === 401) {
        router.push(PATH.AUTH.SIGNUP)
      }
      return false
    }
  }

  return {
    ...form,
    onSubmit,
  }
}