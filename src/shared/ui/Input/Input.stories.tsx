import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  component: Input,
} satisfies Meta<typeof Input>
type story = StoryObj<typeof Input>
export default meta
export const InputDefault: story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
  },
}
export const InputWithIconStart: story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
    icon: <img src={'/search-outline.svg'} />,
    iconPosition: 'start',
  },
}
export const InputWithIconEnd: story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
    icon: <img src={'/eye-outline.svg'} />,
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
