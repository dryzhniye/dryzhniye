import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@/shared/ui/Select/Select'
import { useState } from 'react'

const meta = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>;

const options = ['first', 'second']

export const Controlled: Story = {
  args: {
    options,
    onChange: (value: string) => console.log(value),
  },
  render: () => {
    const ControlledComponent = () => {
      const [selectedValue, setSelectedValue] = useState<string | undefined>()

      return (
        <Select selectedValue={selectedValue} options={options} onChange={setSelectedValue} />
      )
    }

    return <ControlledComponent />
  },
}

export const WithTitle: Story = {
  args: {
    options,
    title: 'Select-box',
    onChange: () => {
    },
  },
}

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    onChange: () => {
    },
  },
}

export const language: Story = {
  args: {
    options: ['English', 'Russian'],
    onChange: () => {
    },
    selectedValue: 'English',
    isLanguage: true,
    width: '155px',
  },
  render: (args) => {
    const ControlledComponent = () => {
      const [value, setValue] = useState<string | undefined>(args.selectedValue)

      return (
        <Select
          {...args}
          selectedValue={value}
          onChange={setValue}
        />
      )
    }


    return (
      <ControlledComponent />
    )
  },
}