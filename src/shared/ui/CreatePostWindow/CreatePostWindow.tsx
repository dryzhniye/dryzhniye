import React, { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import s from './CreatePostWindow.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'
import { useCreatePostMutation, useGetProfileQuery, useUploadImagesForPostMutation } from '@/lib/api/postApi'
import TextArea from '@/shared/ui/TextArea/TextArea'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePostWindow = ({ open, onOpenChange }: Props) => {
  const [images, setImages] = useState<File[] | null>(null)
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)

  const { data: user } = useGetProfileQuery()

  const [uploadImages, { data: uploadedImages }] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file =>
        file.type.startsWith('image/'),
      )

      if (imageFiles.length > 0) {
        setImages(imageFiles)
      }
    } else {
      setImages(null)
    }
  }

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file)
  }

  const handlePublish = async () => {
    try {
      if (!images) {
        return
      }

      const uploadedImages = await uploadImages({ files: images }).unwrap()

      await createPost({
        description,
        uploadIds: uploadedImages.images.map(img => img.uploadId),
      }).unwrap()

      onOpenChange(false)
      setImages(null)
      setDescription('')

    } catch
      (error) {
      console.error(error)
    }
  }

  const handleCloseAttempt = () => {
    if (images || description) {
      setShowCloseConfirm(true)
    } else {
      onOpenChange(false)
    }
  }

  const confirmClose = () => {
    setShowCloseConfirm(false)
    onOpenChange(false)
    setImages(null)
    setDescription('')
  }

  const cancelClose = () => {
    setShowCloseConfirm(false)
  }

  const userAvatar = user?.avatars[0]?.url || '/avatar.svg'

  return (
    <Dialog.Root open={open} onOpenChange={handleCloseAttempt}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.modalOverlay} />

        <Dialog.Content
          className={`${s.modalContent} ${images ? s.large : s.small}`}
        >
          <DialogTitle></DialogTitle>
          {/* Header */}
          <div className={s.modalHeader}>
            {images && <button onClick={() => setImages(null)} className={s.closeButton}>
              <Image src={'/arrow-ios-back.svg'} alt={'<'} width="24" height="24" />
            </button>}
            <div className={s.modalTitle}>
              {images ? 'Publication' : 'Add Photo'}
            </div>
            {!images && <Dialog.Close className={s.closeButton} onClick={handleCloseAttempt}>
              <Image src={'/closeIcon.svg'} alt={'X'} width="14" height="14" />
            </Dialog.Close>}
            {images && (
              <Button title={'Publish'} width={'90px'} onClick={handlePublish} asChild={'a'} variant={'link'} />
            )}
          </div>

          {/* Main Content */}
          <div className={s.mainContent}>
            {!images ? (
              <div className={s.uploadSection}>
                <div className={s.uploadIcon}>
                  <Image src={'/picture.svg'} alt={'picture'} width="48" height="48" />
                </div>
                <Button title={'Select from Computer'} width={'100%'} onClick={() => fileInputRef.current?.click()} />
                <input
                  ref={fileInputRef}
                  type="file"
                  className={s.hiddenInput}
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </div>
            ) : (
              <div className={s.previewSection}>
                <div className={s.imagePreview}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className={s.image}
                          src={getImagePreview(image)}
                          alt="post photo"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className={s.descriptionSection}>
                  <div className={s.textBlock}>
                    <div className={s.author}>
                      <img className={s.avatar} src={userAvatar} alt="" />
                      <Link className={s.title} href={PATH.USERS.PROFILE}>URLProfile</Link>
                    </div>
                    <div>
                      <p className={s.description}>Add publication descriptions</p>
                      <TextArea width={'433px'} height={'120px'} title={description} onChange={setDescription} />
                    </div>
                  </div>

                  <div className={s.locationBlock}>
                    <Input placeholder={'New York'} label={'Add location'} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Close Confirmation Dialog */}
          {showCloseConfirm && (
            <div className={s.confirmationDialog}>
              <div className={s.confirmationContent}>
                <div className={s.confirmationHeader}>
                  <p className={s.modalTitle}>Close</p>
                  <button
                    onClick={cancelClose}
                    className={s.closeButton}
                  >
                    <Image src={'/closeIcon.svg'} alt={'X'} width="14" height="14" />
                  </button>
                </div>
                <div className={s.confirmationBlock}>
                  <p className={s.confirmationDescription}>Do you really want to close the creation of a
                    publication?<br />
                    If you close everything will be deleted</p>
                  <Button title={'Discard'} variant={'outlined'} onClick={confirmClose} />
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}