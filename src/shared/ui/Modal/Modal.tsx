import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'
import s from './Modal.module.scss'

export type Props = {
  open: boolean
  onClose: () => void
  modalTitle: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({ modalTitle, onClose, children, open, ...res }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...res}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={s.Content}>
        <div className={s.titleContainer}>
          <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
          <Dialog.Close asChild>
            <button className={s.IconButton} aria-label="Close">
              <Image src="/close-outline.svg" alt="Close" width={20} height={20} />
            </button>
          </Dialog.Close>
        </div>
        <hr className={s.divider} />
        <Dialog.Description className={s.Description}>{children}</Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
