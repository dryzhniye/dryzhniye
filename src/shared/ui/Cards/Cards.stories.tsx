import { Meta, StoryObj } from '@storybook/react'

import Cards from './Cards'

const meta = {
  title: 'Cards',
  component: Cards,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Cards>

export default meta

type Story = StoryObj<typeof meta>

export const Story = {
  args: {
    children: 'Hello world!',
  },
}
