'use client'
import React, { useEffect, useState } from 'react'
import styles from './Alerts.module.scss'
import Image from 'next/image'

type Props = {
  message: string
  isError?: boolean
}

export const Alerts = ({ message, isError}: Props) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`${styles.customAlert} ${isError ? styles.error : ''}`}>
      <p>
        {isError && <span className={styles.errorTitle}>Error! </span>}
        {message}
      </p>
      <div className={styles.closeIcon} onClick={handleClose}>
        <Image src={'closeIcon.svg'} alt={'closeIcon'} width={14} height={14} />
      </div>
    </div>
  )
}