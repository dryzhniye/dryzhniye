import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Modal, type Props } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWrapper = (args: Props) => {
  const [showModal, setShowModal] = useState(args.open)

  useEffect(() => {
    setShowModal(args.open)
  }, [args.open])

  return (
    <Modal {...args} open={showModal} onClose={() => setShowModal(false)}>
      {args.children}
    </Modal>
  )
}

export const Default: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    open: false,
    children: 'Содержимое модального окна',
  },
}
