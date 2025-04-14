'use client'
import { PostList } from '@/shared/ui/CardPosts/PostList/PostList'
import styles from './CardPosts.module.scss'
import { useGetProfilePostQuery } from '@/lib/api/postApi'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
}

export const CardPosts = ({ open, onOpenChange, postId }: Props) => {
  const { data } = useGetProfilePostQuery(postId)

  return (
    <Dialog.Root open={open} onOpenChange={() => onOpenChange(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content className={styles.modalContent}>
          <DialogTitle></DialogTitle>
          <div className={styles.imageBlock}>
            <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
              {data?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img className={styles.image} src={image.url} alt="post photo" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {data && <PostList post={data} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
