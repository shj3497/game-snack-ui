import {Meta, StoryObj} from '@storybook/react';

import RouletteResultFail from './RouletteResultFail';
import useRouletteStore from '@/lib/store/events/useRoulette';

const meta: Meta<typeof RouletteResultFail> = {
  title: 'Event/roulette/ResultFailPage',
  component: RouletteResultFail,
};
export default meta;

type Story = StoryObj<typeof RouletteResultFail>;

export const Default: Story = {
  render: () => {
    useRouletteStore.setState({isLimited: false});
    return <RouletteResultFail />;
  },
};

export const Limited: Story = {
  render: () => {
    useRouletteStore.setState({isLimited: true});
    return <RouletteResultFail />;
  },
};
