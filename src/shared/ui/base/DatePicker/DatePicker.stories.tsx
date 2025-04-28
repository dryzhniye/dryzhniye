import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select', options: ['single', 'range'] },
      description: 'Selection mode for the date picker'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker'
    }
  },
  parameters: {
    layout: 'centered',
  }
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    mode: 'range',
  },
  name: 'Default Range Picker'
};

export const SingleDatePicker: Story = {
  args: {
    mode: 'single',
  },
  name: 'Single Date Picker'
};

export const WithError: Story = {
  args: {
    mode: 'range',
    error: 'Invalid date range selected',
  },
  name: 'With Error State'
};

export const DisabledPicker: Story = {
  args: {
    mode: 'range',
    disabled: true,
  },
  name: 'Disabled Picker'
};
