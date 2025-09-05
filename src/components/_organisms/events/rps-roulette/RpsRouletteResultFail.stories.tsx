import {Meta, StoryObj} from '@storybook/react';

import RpsRouletteResultFail from './RpsRouletteResultFail';
import useRpsRouletteStore from '@/lib/store/events/useRpsRoulette';

const meta: Meta<typeof RpsRouletteResultFail> = {
  title: 'Event/rps-roulette/ResultFailPage',
  component: RpsRouletteResultFail,
};
export default meta;

type Story = StoryObj<typeof RpsRouletteResultFail>;

export const Default: Story = {
  render: () => {
    useRpsRouletteStore.setState({isLimited: false});
    return <RpsRouletteResultFail />;
  },
};

export const Limited: Story = {
  render: () => {
    useRpsRouletteStore.setState({isLimited: true});
    return <RpsRouletteResultFail />;
  },
};
