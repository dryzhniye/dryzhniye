import React, { useRef, useState } from 'react'
import Image from 'next/image'
import s from './ProfilePhotoAddForm.module.scss'
import { Button } from '@/shared/ui/base/Button/Button'

export const ProfilePhotoAddForm = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

      <Button width={'198px'} title={'Add a Profile Photo'} variant={'outlined'} onClick={() => fileInputRef.current?.click()}/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e)}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />

    </div>
  );
};