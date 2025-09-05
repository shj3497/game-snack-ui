import {Meta, StoryObj} from '@storybook/react';

import StopWatch from './StopWatch';
import {Box} from '@mui/material';

const meta: Meta<typeof StopWatch> = {
  title: 'Event/catch-second/StopWatch',
  component: StopWatch,

  decorators: [
    (Story) => (
      <Box p={2} sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof StopWatch>;

export const Default: Story = {
  render: (args) => <StopWatch {...args} />,
  args: {
    isPlaying: false,
  },
};

export const Playing: Story = {
  render: (args) => <StopWatch {...args} />,
  args: {
    isPlaying: true,
  },
};
