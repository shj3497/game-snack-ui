import {Meta, StoryObj} from '@storybook/react';

import RpsRouletteIntro from './RpsRouletteIntro';

const meta: Meta<typeof RpsRouletteIntro> = {
  title: 'Event/rps-roulette/IntroPage',
  component: RpsRouletteIntro,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RpsRouletteIntro>;

export const Default: Story = {
  render: () => <RpsRouletteIntro />,
};
