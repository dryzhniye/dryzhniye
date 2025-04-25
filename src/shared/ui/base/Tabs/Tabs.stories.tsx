import { Meta, StoryObj } from '@storybook/react'
import TabsComponent from './Tabs'

const meta = {
  title: 'Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  argTypes: {
    defaultTab: { control: 'text' },
  },
} satisfies Meta<typeof TabsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { id: 'tab1', title: 'Tab', content: <div>Content for Tab 1</div> },
      { id: 'tab2', title: 'Tab', content: <div>Content for Tab 2</div> },
      { id: 'tab3', title: 'Tab', content: <div>Content for Tab 3</div> },
    ],
    defaultTab: 'tab1',
  },
}
export const Disabled: Story = {
  args: {
    tabs: [
      { id: 'tab1', title: 'Tab', content: <div>Content for Tab 1</div> },
      { id: 'tab2', title: 'Tab', content: <div>Content for Tab 2</div>, disabled: true },
      { id: 'tab3', title: 'Tab', content: <div>Content for Tab 3</div> },
    ],
    defaultTab: 'tab1',
  },
}
