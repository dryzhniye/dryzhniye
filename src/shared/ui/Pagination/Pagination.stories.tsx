import { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'
import { action } from '@storybook/addon-actions'

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
    onPageSizeChange: action('onPageSizeChange'), // добавляем действие
    onPageChange: action('onPageChange'), // добавляем действие
    pageSize: 10,
    totalCount: 550,
  },
}
export const SevenPage: Story = {
  args: {
    onPageSizeChange: action('onPageSizeChange'), // добавляем действие
    onPageChange: action('onPageChange'), // добавляем действие
    currentPage: 7,
    pageSize: 10,
    totalCount: 550,
  },
}
