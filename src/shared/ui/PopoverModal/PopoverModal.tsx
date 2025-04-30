import React, { ReactNode, useRef, useEffect } from 'react'
import s from './PopoverModal.module.scss'
import { Scrollbar } from '@/shared/ui/base/Scrollbar'

type PopoverModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const PopoverModal = ({ children, isOpen, onClose }: PopoverModalProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={s.popoverOverlay}>
      <div ref={popoverRef} className={s.popoverContent}>
        <div className={s.popoverArrow}></div>
        <div className={s.popoverTitle}>Уведомления</div>
        <Scrollbar>
          <div className={s.popoverBody}>{children}</div>
        </Scrollbar>
      </div>
    </div>
  )
}