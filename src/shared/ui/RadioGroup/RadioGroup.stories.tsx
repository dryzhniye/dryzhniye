import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '@/shared/ui/RadioGroup/RadioGroup'
import { useState } from 'react'

const meta = {
  component: RadioGroup,
  decorators: [(Story) =>
    <div style={{ backgroundColor: 'black', padding: '20px', minHeight: '100vh' }}>
      <Story />
    </div>,
  ],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>;

const options = [{value: '1', label: 'RadioGroup'}, {value: '2', label: 'RadioGroup'}]

export const Controlled: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('1')

    return <RadioGroup options={options} selectedValue={selectedValue} onChange={setSelectedValue}/>
  }
}

export const Disabled: Story = {
  args: {
    options,
    selectedValue: '1',
    disabled: true,
    onChange: () => {}
  },
}