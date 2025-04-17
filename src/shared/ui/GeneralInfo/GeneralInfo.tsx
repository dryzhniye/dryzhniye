'use client'

import { ProfilePhotoAddForm } from '@/shared/ui/ProfilePhotoAddForm/ProfilePhotoAddForm'
import { GeneralInfoForm } from '@/shared/ui/GeneralInfoForm/GeneralInfoForm'
import { Button } from '@/shared/ui/base/Button/Button'
import s from './GeneralInfo.module.scss'
import React, { useEffect, useMemo } from 'react'
import { generalInfoSchema, type SettingsForm } from '@/shared/lib/schemas/settingsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getFormValues, saveFormValues } from '@/shared/lib/utils/formStorage'
import { useUpdateProfileMutation } from '@/shared/api/profileApi'
import { parse } from 'date-fns'

//todo: apply right type for error
type ErrorResponse = {
  statusCode: number;
  messages: {
    message: string;
    field: string;
  }[];
  error: string;
};

export const GeneralInfo = () => {

  const defaultValues = useMemo(() => getFormValues(), [])
  const [updateProfile] = useUpdateProfileMutation()

    const {
      register,
      handleSubmit,
      setValue,
      control,
      watch,
      reset,
      formState: { errors, isValid },
    } = useForm<SettingsForm>({
      mode: 'all',
      resolver: zodResolver(generalInfoSchema),
      defaultValues
    })

    const onSettingsSubmit = async (data: SettingsForm) => {
      debugger
      if (data.dateOfBirth) {
        const parsed = parse(data.dateOfBirth, 'dd/MM/yyyy', new Date())
        const utcDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()))
        data.dateOfBirth = utcDate.toISOString()
      }
      try {
        await updateProfile(data).unwrap()

        localStorage.removeItem('settingsForm')
        reset()
        setValue('userName', '')
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('dateOfBirth', '')
        setValue('aboutMe', '')
        setValue('aboutMe', '')
        setValue('country', '')
        setValue('city', '')

//todo:make custom alert appeared
        alert('Profile updated')

      } catch (err: any) {
        console.log(err)
        console.error('Update failed', err.data.messages[0].message)
      }

    }

  useEffect(() => {
    const subscription = watch((value) => {
      saveFormValues(value as string)
    })
    return () => subscription.unsubscribe()
  }, [watch])


  return (
    <form onSubmit={handleSubmit(onSettingsSubmit)}>
    <div className={s.generalInfoContainer}>
      <div className={s.photoSidebar}>
        <ProfilePhotoAddForm />
      </div>

      <div className={s.generalInfoContent}>

        <GeneralInfoForm control={control} register={register} setValue={setValue} errors={errors}/>

      </div>
    </div>
        <div className={s.formActions}>
          <Button type={'submit'} title={'Save Changes'} disabled={!isValid}/>
        </div>
    </form>
  )

}




