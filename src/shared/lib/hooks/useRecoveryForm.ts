import { useCreateNewPasswordMutation } from '@/shared/api/authApi'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/lib/const/PATH'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordRecoverySchema, TPasswordRecoveryValues } from '@/shared/lib/schemas/authSchemas'

export const usePasswordRecoveryForm = (recoveryCode: string | null) => {
  const router = useRouter()
  const [createNewPassword] = useCreateNewPasswordMutation()

  const form = useForm<TPasswordRecoveryValues>({
    resolver: zodResolver(passwordRecoverySchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TPasswordRecoveryValues) => {
    if (!recoveryCode) {
      router.push(PATH.AUTH.LOGIN)
      return
    }

    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode,
      }).unwrap()

      router.push(PATH.AUTH.LOGIN)
    } catch (error) {
      const apiError = error as {
        data?: {
          messages: Array<{ message: string }>
        }
      }

      form.reset()
      form.setError('newPassword', {
        type: 'manual',
        message: apiError?.data?.messages[0]?.message || 'Ошибка при создании пароля',
      })
    }
  }

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  }
}