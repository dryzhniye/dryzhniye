import React from 'react'
import s from './../forgot-password/forgot-password.module.scss'

export const RecoverySkeleton = () => {
  return (
    <div className={s.block + ' ' + s.skeleton}>
      <div className={s.skeletonTitle}></div>
      <div className={s.skeletonPassword}></div>
      <div className={s.skeletonPassword}></div>
      <div className={s.skeletonButton}></div>
    </div>
  )
}