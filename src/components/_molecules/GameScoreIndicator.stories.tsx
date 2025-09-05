import {Meta, StoryObj} from '@storybook/react';
import GameScoreIndicator from './GameScoreIndicator';
import {Box} from '@mui/material';

const meta: Meta<typeof GameScoreIndicator> = {
  title: '_Molecules/GameScoreIndicator',
  component: GameScoreIndicator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box width="360px" p={1} sx={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GameScoreIndicator>;

export const Default: Story = {
  render: (args) => <GameScoreIndicator {...args} />,
  args: {
    gameScores: [
      {type: 'normal', score: undefined, useAnimate: false},
      {type: 'normal', score: undefined, useAnimate: false},
      {type: 'normal', score: undefined, useAnimate: false},
    ],
  },
};

export const Fail: Story = {
  render: (args) => <GameScoreIndicator {...args} />,
  args: {
    gameScores: [
      {type: 'fail', score: '꽝', useAnimate: false},
      {type: 'fail', score: '꽝', useAnimate: true},
      {type: 'normal', score: undefined},
    ],
  },
};

export const Success: Story = {
  render: (args) => <GameScoreIndicator {...args} />,
  args: {
    gameScores: [
      {type: 'fail', score: '꽝', useAnimate: false},
      {type: 'success', score: '3', useAnimate: true},
      {type: 'normal', score: undefined},
    ],
  },
};
