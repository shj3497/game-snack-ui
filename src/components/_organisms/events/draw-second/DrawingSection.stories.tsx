import {Meta, StoryObj} from '@storybook/react';

import DrawingSection from './DrawingSection';
import {Box, Button} from '@mui/material';
import {useState} from 'react';

const meta: Meta<typeof DrawingSection> = {
  title: 'Event/draw-second/DrawingSection',
  component: DrawingSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DrawingSection>;

const Template = (args: any) => {
  const [playState, setPlayState] = useState({
    isPlaying: false,
    isDisabled: false,
    isParticipated: false,
    isFinish: false,
  });
  const onGameEnd = (score: number) => {
    setPlayState({
      isPlaying: false,
      isDisabled: false,
      isParticipated: true,
      isFinish: true,
    });
  };
  const onGameStart = () => {
    setPlayState({
      isPlaying: true,
      isDisabled: false,
      isParticipated: true,
      isFinish: false,
    });
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <DrawingSection
        {...args}
        isFinish={playState.isFinish}
        isPlaying={playState.isParticipated}
        onGameEnd={onGameEnd}
      />
      <Button variant="contained" onClick={onGameStart}>
        Start
      </Button>
    </Box>
  );
};

export const Square: Story = {
  render: (args) => <Template {...args} />,
  args: {
    diagram: 'square',
  },
};

export const Circle: Story = {
  render: (args) => <Template {...args} />,
  args: {
    diagram: 'circle',
  },
};

export const Pentagon: Story = {
  render: (args) => <Template {...args} />,
  args: {
    diagram: 'pentagon',
  },
};

export const Rhombus: Story = {
  render: (args) => <Template {...args} />,
  args: {
    diagram: 'rhombus',
  },
};

export const Triangle: Story = {
  render: (args) => <Template {...args} />,
  args: {
    diagram: 'triangle',
  },
};
