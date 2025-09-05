import {Meta, StoryObj} from '@storybook/react';

import PlayButton from './PlayButton';
import {Box} from '@mui/material';

const meta: Meta<typeof PlayButton> = {
  title: 'Event/catch-second/PlayButton',
  component: PlayButton,

  decorators: [
    (Story) => (
      <Box p={2} width={360}>
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PlayButton>;

export const Default: Story = {
  render: (args) => <PlayButton {...args} />,
  args: {
    isPlaying: false,
  },
};

export const Playing: Story = {
  render: (args) => <PlayButton {...args} />,
  args: {
    isPlaying: true,
  },
};

export const Disabled: Story = {
  render: (args) => <PlayButton {...args} />,
  args: {
    isPlaying: true,
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => <PlayButton {...args} />,
  args: {
    isPlaying: false,
    loading: true,
  },
};
