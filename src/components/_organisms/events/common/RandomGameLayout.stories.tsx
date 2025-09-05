import {Meta, StoryObj} from '@storybook/react';

import RandomGameLayout from './RandomGameLayout';

const meta: Meta<typeof RandomGameLayout> = {
  title: 'Event/common/RandomGameLayout',
  component: RandomGameLayout,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RandomGameLayout>;

export const Default: Story = {
  render: () => <RandomGameLayout />,
};
