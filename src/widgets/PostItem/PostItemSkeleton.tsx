import React from 'react'
import s from './PostItem.module.scss'

export const PostItemSkeleton = () => {
  return (
    <>
      {new Array(3).fill(null).map((_) => (
        <div className={s.postItem}></div>
      ))}
    </>
  )
}