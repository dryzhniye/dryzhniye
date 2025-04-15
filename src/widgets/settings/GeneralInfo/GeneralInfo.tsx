import { ProfilePhotoAddForm } from '@/widgets/settings/ProfilePhotoAddForm/ProfilePhotoAddForm'
import { GeneralInfoForm } from '@/widgets/settings/GeneralInfoForm/GeneralInfoForm'
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




