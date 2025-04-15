import { ProfilePhotoAddForm } from '@/shared/ui/ProfilePhotoAddForm/ProfilePhotoAddForm'
import { GeneralInfoForm } from '@/shared/ui/GeneralInfoForm/GeneralInfoForm'
import { Button } from '@/shared/ui/base/Button/Button'
import s from './GeneralInfo.module.scss'
import React from 'react'


export const GeneralInfo = () => {

  return (
    <div>
    <div className={s.generalInfoContainer}>
      <div className={s.photoSidebar}>
        <ProfilePhotoAddForm />
      </div>

      <div className={s.generalInfoContent}>

        <GeneralInfoForm />

      </div>
    </div>
        <div className={s.formActions}>
          <Button title={'Save Changes'} />
        </div>
    </div>
  )

}




