import React, { useRef, useState } from 'react'
import Image from 'next/image'
import s from './ProfilePhotoAddForm.module.scss'
import { Button } from '@/shared/ui/base/Button/Button'
import { useGetProfileQuery, useSetAvatarMutation } from '@/shared/api/profileApi'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

export const ProfilePhotoAddForm = () => {
  const [photoUrl, setPhotoUrl] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [setAvatar] = useSetAvatarMutation()
  const { data: profileData } = useGetProfileQuery()

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file)
  }

  const handlePublish = async () => {
    try {
      if (!photoUrl) {
        return
      }
      await setAvatar({ file: photoUrl }).unwrap()
      handleCloseAttempt()
    } catch
      (error) {
      console.error(error)
    }
  }

  const handleCloseAttempt = () => {
    setPhotoUrl(null)
    setIsModalOpen(false)
  }

  return (
    <div className={s.profilePhotoContainer}>
      <div className={s.profilePhoto}>
        {profileData?.avatars[0].url ? (
          <img src={profileData?.avatars[0].url} alt="User profile" />
        ) : (
          <div className={s.photoPlaceholder}>
            <Image src={'/picture.svg'} alt={'no photo'} width="48" height="48" />
          </div>
        )}
      </div>

      <Button width={'198px'} title={'Add a Profile Photo'} variant={'outlined'}
              onClick={() => setIsModalOpen(true)} type="button" />

      <Dialog.Root open={isModalOpen} onOpenChange={handleCloseAttempt}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.modalOverlay} />

          <Dialog.Content
            className={s.modalContent}
          >
            <DialogTitle></DialogTitle>
            {/* Header */}
            <div className={s.modalHeader}>
              <div className={s.modalTitle}>
                Add a Profile Photo
              </div>
              <Dialog.Close className={s.closeButton} onClick={handleCloseAttempt}>
                <Image src={'/closeIcon.svg'} alt={'X'} width="14" height="14" />
              </Dialog.Close>
            </div>

            {/* Main Content */}

              {!photoUrl ? <div className={s.uploadSection}>
                  <div className={s.uploadIcon}>
                    <Image src={'/picture.svg'} alt={'picture'} width="48" height="48" />
                  </div>
                  <Button title="Select from Computer" width={'100%'} onClick={() => fileInputRef.current?.click()} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    className={s.hiddenInput}
                    accept="image/*"
                    onChange={(e) => setPhotoUrl(e.target.files?.[0] || null)}
                  />
                </div>
                :
                <div className={s.previewSection}>
                  <Image src={getImagePreview(photoUrl)} alt={'photo'} width="330" height="330" />
                  <Button title="Save" width={'86px'} onClick={handlePublish} className={s.button}/>
                </div>
              }
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}