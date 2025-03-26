import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
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
    icon: <Image src={'/search-outline.svg'} alt={'search'} width={20} height={20} />,
    iconPosition: 'start',
  },
}
export const InputWithIconEnd: story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: false,
    icon: <Image src="/eye-outline.svg" alt={'eye'} width={20} height={20} />,
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
