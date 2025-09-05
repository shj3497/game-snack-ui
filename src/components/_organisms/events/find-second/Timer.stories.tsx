import {Meta, StoryObj} from '@storybook/react';
import Timer from './Timer';
import {useState} from 'react';
import {Box, Button} from '@mui/material';

const meta: Meta<typeof Timer> = {
  title: 'Event/find-second/Timer',
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
  const [isIntroducing, setIsIntroducting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);

  const onIntroducingEnd = () => {
    setIsIntroducting(false);
    setIsPlaying(true);
    setIsParticipated(true);
  };

  const onTimerEnd = () => {
    setIsIntroducting(false);
    setIsPlaying(false);
    setIsParticipated(true);
  };

  return (
    <Box>
      <Timer
        {...args}
        isPlaying={isPlaying}
        isIntroducing={isIntroducing}
        isParticipated={isParticipated}
        onIntroducingEnd={onIntroducingEnd}
        onTimerEnd={onTimerEnd}
      />
      <Box mt={3}>
        <Button
          onClick={() => {
            setIsIntroducting(true);
            setIsPlaying(false);
            setIsParticipated(true);
          }}
          sx={{backgroundColor: 'game_yellow.main'}}
        >
          Start
        </Button>
        <Button
          onClick={() => {
            setIsPlaying(false);
          }}
          disabled={!isPlaying}
          sx={{backgroundColor: 'game_yellow.main'}}
        >
          Stop
        </Button>
        <Button
          onClick={() => {
            setIsIntroducting(false);
            setIsPlaying(false);
            setIsParticipated(false);
          }}
          sx={{backgroundColor: 'game_yellow.main'}}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    totalTime: 6000,
    introducingCountTime: 3999,
    introducingTime: 4000,
  },
};

export const FiveSecond: Story = {
  render: Template,
  args: {
    totalTime: 5000,
    introducingCountTime: 3999,
    introducingTime: 4000,
  },
};
