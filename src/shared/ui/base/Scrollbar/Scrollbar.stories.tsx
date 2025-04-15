import type { Meta, StoryObj } from '@storybook/react'
import { Scrollbar } from './Scrollbar'

const meta: Meta<typeof Scrollbar> = {
  title: 'UI/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // backgrounds: {
    //   default: 'black',
    // },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Scrollbar>;

export const CustomScrollbarDarkTheme: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Scrollbar>
        <div style={{ width: '300px', height: '300px'}}>
          <div style={{ width: '1000px', height: '1000px', background: '#666A6E' }}>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            Scrollable content<br/>
            scroll me
          </div>
        </div>
      </Scrollbar>
    </div>
  ),
};