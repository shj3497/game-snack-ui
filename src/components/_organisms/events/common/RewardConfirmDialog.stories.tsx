import {Meta, StoryObj} from '@storybook/react';
import RewardConfirmDialog from './RewardConfirmDialog';

const meta: Meta<typeof RewardConfirmDialog> = {
  title: 'Event/common/RewardConfirmDialog',
  component: RewardConfirmDialog,
};
export default meta;

type Story = StoryObj<typeof RewardConfirmDialog>;

export const MiniGame: Story = {
  render: (args) => <RewardConfirmDialog {...args} />,
  args: {
    open: true,
    gameType: 'miniGame',
  },
};

export const RandomGame: Story = {
  render: (args) => <RewardConfirmDialog {...args} />,
  args: {
    open: true,
    gameType: 'randomGame',
  },
};
