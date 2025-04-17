'use client'

import { ProfilePhotoAddForm } from '@/shared/ui/ProfilePhotoAddForm/ProfilePhotoAddForm'
import { GeneralInfoForm } from '@/shared/ui/GeneralInfoForm/GeneralInfoForm'
import { Button } from '@/shared/ui/base/Button/Button'
import s from './GeneralInfo.module.scss'
import React, { useEffect, useMemo, useState } from 'react'
import { generalInfoSchema, type SettingsForm } from '@/shared/lib/schemas/settingsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getFormValues, saveFormValues } from '@/shared/lib/utils/formStorage'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/profileApi'
import { parse } from 'date-fns'
import { Alerts } from '@/shared/ui/base/Alerts/Alerts'

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
  const { data: profileData } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const [alert, setAlert] = useState<{ message: string; isError?: boolean, id: number } | null>(null)

  const showSuccess = (msg: string) => {
    setAlert({ message: msg, isError: false, id: Date.now() })
  }
  const showError = (msg: string) => {
    setAlert({ message: msg, isError: true, id: Date.now() })
  }

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

  useEffect(() => {
    if (profileData) {
      setValue('userName', profileData.userName)
      setValue('firstName', profileData.firstName)
      setValue('lastName', profileData.lastName)
      // setValue('dateOfBirth', profileData.dateOfBirth?.slice(0, 10))
      // setValue('aboutMe', profileData.aboutMe)
      // setValue('country', profileData.country)
      // setValue('city', profileData.city)
    }
  }, [profileData, setValue])

    const onSettingsSubmit = async (data: SettingsForm) => {
      debugger
      if (data.dateOfBirth) {
        const parsed = parse(data.dateOfBirth, 'dd/MM/yyyy', new Date())
        const utcDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()))
        data.dateOfBirth = utcDate.toISOString()
      }
      try {
        await updateProfile(data).unwrap()

        sessionStorage.removeItem('settingsForm')
        reset()
        setValue('userName', '')
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('dateOfBirth', undefined)
        setValue('aboutMe', '')
        setValue('aboutMe', '')
        setValue('country', '')
        setValue('city', '')

        showSuccess('Your settings are saved')
      } catch (err: any) {

        debugger
        const errMessage = err.data.messages[0].message
        console.error('Update failed', errMessage)
        showError(errMessage)
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
      {alert &&
        <Alerts key={alert.id} style={{marginBottom: '24px', marginLeft: '176px'}} message={alert.message} isError={alert.isError} />
    }
    </form>
  )

}




