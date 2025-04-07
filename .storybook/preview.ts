import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
      backgrounds: {
          default: 'dark',
          values: [
              { name: 'dark', value: '#000' },
              { name: 'light', value: '#fff' },
          ],
      },
  },
};


export default preview;