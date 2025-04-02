import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './Menu'

const meta = {
  title: 'Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const HomeActive: Story = {
  args: {
    pathname: '/home',
  },
}

export const AddPostActive: Story = {
  args: {
    pathname: '/addPost',
  },
}

export const CommentsActive: Story = {
  args: {
    pathname: '/comments',
  },
}

export const SearchActive: Story = {
  args: {
    pathname: '/search',
  },
}

export const ProfileActive: Story = {
  args: {
    pathname: '/profiles',
  },
}
