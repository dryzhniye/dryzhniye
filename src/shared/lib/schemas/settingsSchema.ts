import { z } from 'zod'
import { parse } from 'date-fns'

const MIN_AGE = 13

const dateOfBirthSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (value) {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date())

      if (isNaN(parsedDate.getTime())) return false

      const today = new Date()

      let age = today.getFullYear() - parsedDate.getFullYear()
      const hasHadBirthdayThisYear =
        today.getMonth() > parsedDate.getMonth() ||
        (today.getMonth() === parsedDate.getMonth() &&
          today.getDate() >= parsedDate.getDate())

      if (!hasHadBirthdayThisYear) {
        age--
      }

      return age >= MIN_AGE
    }
  }, {
    message: 'too_young',
  })

export const generalInfoSchema = z.object({
  userName: z
    .string()
    .min(6, 'Username must be at least 6 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, underscores and hyphens are allowed'),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Only letters are allowed'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Only letters are allowed'),

  city: z
    .string()
    .optional(),

  country: z
    .string()
    .optional(),

  dateOfBirth: dateOfBirthSchema,

  aboutMe: z
    .string()
    .max(200, 'Max 200 characters')
    .optional(),
})

export type SettingsForm = z.infer<typeof generalInfoSchema>