import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import GameCountItem from './GameCountItem';
import {Box} from '@mui/material';

const meta: Meta<typeof GameCountItem> = {
  title: '_Molecules/GameCountItem',
  component: GameCountItem,
  decorators: [
    (Story) => (
      <Box
        padding={2}
        width="fit-content"
        sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      >
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GameCountItem>;
export const Normal: Story = {
  render: (args) => <GameCountItem {...args} />,
  args: {
    type: 'normal',
    countText: '1회',
  },
};

export const Success: Story = {
  render: (args) => <GameCountItem {...args} />,
  args: {
    successColor: '#00FFBC',
    type: 'success',
    countText: '1회',
    scoreText: '1P',
    useAnimate: true,
  },
};

export const Fail: Story = {
  render: (args) => <GameCountItem {...args} />,
  args: {
    type: 'fail',
    countText: '1회',
    scoreText: '꽝',
    useAnimate: true,
  },
};

export const NoAnimateSuccess: Story = {
  render: (args) => <GameCountItem {...args} />,
  args: {
    type: 'success',
    countText: '1회',
    scoreText: '1P',
    useAnimate: false,
  },
};

export const NoAnimateFail: Story = {
  render: (args) => <GameCountItem {...args} />,
  args: {
    type: 'fail',
    countText: '1회',
    scoreText: '꽝',
    useAnimate: false,
  },
};
