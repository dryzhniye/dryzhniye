'use client'
import { PostList } from '@/shared/ui/CardPosts/PostList/PostList'
import styles from './CardPosts.module.scss'
import { postApi, useGetProfilePostQuery } from '@/shared/api/postApi'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React, { useEffect, useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostType } from '@/shared/lib/types/postsTypes'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'

type Props = {
  onCloseModal: () => void
  postId: number
  post: PostType | undefined
}

export const CardPosts = ({ onCloseModal, postId, post }: Props) => {
  const dispatch = useAppDispatch()

  const needInitPostInStore = useRef(!!post)

  const { data } = useGetProfilePostQuery(postId, {
    skip: needInitPostInStore.current,
  })


  useEffect(() => {
    if (needInitPostInStore.current && post) {
      dispatch(
        postApi.util.upsertQueryData('getProfilePost', postId, post),
      )
      needInitPostInStore.current = false
    }
  }, [dispatch, post, postId])

  useEffect(() => {
    return () => {
      dispatch(
        postApi.util.resetApiState(),
      )
    }
  }, [dispatch])

  const dataForRender = data || post

  return (
    <Dialog.Root open={true} onOpenChange={onCloseModal}>
      <div className="fixed inset-0 z-50">
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content className={styles.modalContent}>
          <DialogTitle></DialogTitle>
          <div className={styles.imageBlock}>
            <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
              {dataForRender?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img className={styles.image} src={image.url} alt="post photo" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {dataForRender && <PostList post={dataForRender} onCloseModal={onCloseModal}/>}
        </Dialog.Content>
      </div>
    </Dialog.Root>
  )
}
