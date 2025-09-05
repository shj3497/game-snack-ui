import {Meta, StoryObj} from '@storybook/react';

import Clock from './Clock';

const meta: Meta<typeof Clock> = {
  title: 'Event/catch-second/Clock',
  component: Clock,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Clock>;

export const Default: Story = {
  render: () => <Clock />,
};
