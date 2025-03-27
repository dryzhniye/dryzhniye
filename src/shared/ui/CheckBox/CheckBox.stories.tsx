import type { Meta, StoryObj } from '@storybook/react'
import { CheckBox } from './CheckBox'

const meta = {
  title: 'Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: 'CheckBox',
  },
}

export const WithoutTitle: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    defaultChecked: true
  },
}

export const DisabledWithTitle: Story = {
  args: {
    title: 'CheckBox',
    disabled: true,
  },
}