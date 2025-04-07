import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'
import s from './Modal.module.scss'

export type Props = {
  width?: string
  height?: string
  open: boolean
  onClose: () => void
  modalTitle: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({ modalTitle, width, height, onClose, children, open, ...res }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...res}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={s.Content} style={{ width, height }}>
        <div className={s.titleContainer}>
          <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
          <Dialog.Close asChild>
            <button className={s.IconButton} aria-label="Close">
              <Image src="/close-outline.svg" alt="Close" width={24} height={24} />
            </button>
          </Dialog.Close>
        </div>
        <div className={s.Description}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
