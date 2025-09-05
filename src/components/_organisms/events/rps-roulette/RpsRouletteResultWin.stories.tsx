import {Meta, StoryObj} from '@storybook/react';

import RpsRouletteResultWin from './RpsRouletteResultWin';

const meta: Meta<typeof RpsRouletteResultWin> = {
  title: 'Event/rps-roulette/ResultWinPage',
  component: RpsRouletteResultWin,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RpsRouletteResultWin>;

export const Default: Story = {
  render: (args) => {
    return <RpsRouletteResultWin {...args} />;
  },
  args: {
    point: '3',
  },
};
