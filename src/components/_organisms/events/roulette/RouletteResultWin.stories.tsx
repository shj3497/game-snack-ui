import {Meta, StoryObj} from '@storybook/react';

import RouletteResultWin from './RouletteResultWin';

const meta: Meta<typeof RouletteResultWin> = {
  title: 'Event/roulette/ResultWinPage',
  component: RouletteResultWin,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RouletteResultWin>;

export const Default: Story = {
  render: (args) => {
    return <RouletteResultWin {...args} />;
  },
};
