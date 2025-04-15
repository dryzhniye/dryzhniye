import { z } from 'zod'

export const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'The email must match the format example@example.com'
    ),
  password: z
    .string()
    .min(6, 'Min 6 characters')
    .max(20, 'Max 20 characters')
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-.,])[A-Za-z\d!@#$%^&*()_+\-.,]{6,20}$/,
      'Password must contain 0-9, a-z, A-Z, special characters'
    ),
})

export const formRegisterSchema = formLoginSchema.extend({
  firstName: z
    .string()
    .min(6, 'Min 6 characters')
    .max(20, 'Max 20 characters')
    .regex(/^[a-zA-Z0-9_-а-яА-ЯёЁ]+$/, 'Only letters, numbers, underscore and hyphen allowed'),

  confirmPassword: z
    .string()
    .min(6, 'Min 6 characters')
    .max(20, 'Max 20 characters')
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-.,])[A-Za-z\d!@#$%^&*()_+\-.,]{6,20}$/,
      'Password must match the required pattern'
    ),

  rememberMe: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // set the error under confirmPassword
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>