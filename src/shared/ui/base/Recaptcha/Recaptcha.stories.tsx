import type { Meta, StoryObj } from '@storybook/react'
import { Recaptcha } from '@/shared/ui/base/Recaptcha/Recaptcha'

const meta = {
  component: Recaptcha,
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'dark',
    onChange: () => {},
    sitekey: "6Lckav8qA"
  },
}