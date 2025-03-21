import type { Meta, StoryObj } from '@storybook/react'

import {Button} from './Button'

const meta = {
    component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        title: 'Button',
        children: 'Primary Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        title: 'Button',
        children: 'Secondary Button',
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        title: 'Button',
        children: 'Hover Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        title: 'Button',
        children: 'Focus Button',
    },
}