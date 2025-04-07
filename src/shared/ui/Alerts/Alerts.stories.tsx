import type { Meta, StoryObj } from '@storybook/react'
import { Alerts } from '@/shared/ui/Alerts/Alerts'

const meta = {
  title: 'Alerts',
  component: Alerts,
  tags: ['autodocs'],
} satisfies Meta<typeof Alerts>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Your settings are saved',
  },
}

export const Error: Story = {
  args: {
    message: 'Server is not available',
    isError: true
  },
}