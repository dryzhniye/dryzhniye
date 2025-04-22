import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import s from './ProfilePhotoAddForm.module.scss'
import { Button } from '@/shared/ui/base/Button/Button'
import { useSetAvatarMutation } from '@/shared/api/profileApi'

type Props = {
  image: string
}

export const ProfilePhotoAddForm = ({ image }: Props) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [setAvatar] = useSetAvatarMutation()

  useEffect(() => {
    setPhotoUrl(image)
  }, [image])

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoUrl(URL.createObjectURL(file));

    try {
      await setAvatar({ file }).unwrap();
      console.log('Аватар успешно загружен!');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }

  return (
    <div className={s.profilePhotoContainer}>
      <div className={s.profilePhoto}>
        {photoUrl ? (
          <img src={photoUrl} alt="User profile" />
        ) : (
          <div className={s.photoPlaceholder}>
            <Image src={'/picture.svg'} alt={'no photo'} width="48" height="48" />
          </div>
        )}
      </div>

      <Button width={'198px'} title={'Add a Profile Photo'} variant={'outlined'}
              onClick={() => fileInputRef.current?.click()} type="button" />
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

    </div>
  )
}