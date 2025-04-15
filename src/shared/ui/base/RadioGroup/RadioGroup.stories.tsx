import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '@/shared/ui/base/RadioGroup/RadioGroup'
import { useState } from 'react'

const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>;

const options = [{ value: '1', label: 'RadioGroup' }, { value: '2', label: 'RadioGroup' }]

export const Controlled: Story = {
  args: {
    options,
    selectedValue: '1',
    onChange: (value: string) => console.log(value),
  },
  render: () => {
    const ControlledComponent = () => {
      const [selectedValue, setSelectedValue] = useState('1')

      return (
        <RadioGroup options={options} selectedValue={selectedValue} onChange={setSelectedValue} />
      )
    }

    return <ControlledComponent />
  },
}

export const Disabled: Story = {
  args: {
    options,
    selectedValue: '1',
    disabled: true,
    onChange: () => {
    },
  },
}