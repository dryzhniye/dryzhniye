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
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        title: 'Button',
    },
}

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        title: 'Button',
    },
}

export const Link: Story = {
    args: {
        variant: 'link',
        title: 'Button',
        asChild: 'a',
        href: 'google.com',
        onClick: () => (alert ()),
    },
}