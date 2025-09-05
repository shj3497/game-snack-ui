import {Meta, StoryObj} from '@storybook/react';

import RouletteIntro from './RouletteIntro';

const meta: Meta<typeof RouletteIntro> = {
  title: 'Event/roulette/IntroPage',
  component: RouletteIntro,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RouletteIntro>;

export const Default: Story = {
  render: () => <RouletteIntro />,
};
