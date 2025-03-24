import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>
type story = StoryObj<typeof Input>
export default meta
export const WithIconStart: story = {
  args: {
    placeholder: 'Input search',
    disabled: false,
    type: 'search',
    error: 'string',
  },
}