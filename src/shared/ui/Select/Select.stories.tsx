import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@/shared/ui/Select/Select'

const meta = {
  component: Select,
  decorators: [(Story) => (
    <div style={{ backgroundColor: 'black', padding: '20px', minHeight: '100vh' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['first', 'second']
  },
}

export const DefaultWithTitle: Story = {
  args: {
    options: ['first', 'second'],
    title: 'Select-box'
  },
}

export const Disabled: Story = {
  args: {
    options: ['first', 'second'],
    disabled: true
  },
}