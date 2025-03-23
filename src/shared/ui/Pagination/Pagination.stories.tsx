import { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    onPageChange: () => {},
    pageSize: 10,
    totalCount: 550,
  },
}
export const SevenPage: Story = {
  args: {
    onPageChange: () => {},
    currentPage: 7,
    pageSize: 10,
    totalCount: 550,
  },
}
