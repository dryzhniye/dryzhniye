import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },

};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Typography variant="large">Large: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="h1" as="h1">h1: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="h2" as="h2">h2: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="h3" as="h3">h3: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="regular-text-16">regular-text-16: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="bold-text-16">bold-text-16: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="regular-text-14">regular-text-14: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="medium-text-14">medium-text-14: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="bold-text-14">bold-text-14: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="small-text">small-text: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="semi-bold-small-text">semi-bold-small-text: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</Typography>
      <Typography variant="regular-link" asChild>
        <a href="#">regular-link: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</a>
      </Typography>
      <Typography variant="small-link" asChild>
        <a href="#">small-link: Carosserie Test Zürich<br/> Stauffacherstrasse 31 8004 Zürich, ZH, CH</a>
      </Typography>
    </div>
  ),
};