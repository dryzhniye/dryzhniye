import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>
type story = StoryObj<typeof Input>
export default meta

export const InputDefault: story = {
  args: {
    type: 'text',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
  },
}
export const InputWithIconStart: story = {
  args: {
    type: 'search',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
    iconPosition: 'start',
  },
}
export const InputWithIconEnd: story = {
  args: {
    type: 'password',
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
    iconPosition: 'end',
  },
}
export const InputError: story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    error: 'Error text',
  },
}
