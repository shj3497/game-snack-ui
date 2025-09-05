import {Meta, StoryObj} from '@storybook/react';
import Timer from './Timer';
import {Box, Button} from '@mui/material';
import {useState} from 'react';

const meta: Meta<typeof Timer> = {
  title: 'Event/draw-second/Timer',
  component: Timer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box py={5} px={10} sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Timer>;

const Template = (args: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box>
      <Timer {...args} isPlaying={isPlaying} />
      <Box mt={3}>
        <Button
          onClick={() => {
            setIsPlaying(true);
          }}
          sx={{backgroundColor: 'game_yellow.main'}}
        >
          Start
        </Button>
        <Button
          onClick={() => {
            setIsPlaying(false);
          }}
          sx={{backgroundColor: 'game_green.main'}}
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    totalTime: 6000,
  },
};

export const FiveSecond: Story = {
  render: Template,
  args: {
    totalTime: 5000,
  },
};
