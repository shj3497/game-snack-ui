import {Meta, StoryObj} from '@storybook/react';

import RouletteParticipate from './RouletteParticipate';

const meta: Meta<typeof RouletteParticipate> = {
  title: 'Event/roulette/ParticipatePage',
  component: RouletteParticipate,
  tags: ['autodocs'],
  argTypes: {
    systemRate: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
      description: 'System rate',
      defaultValue: 100,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RouletteParticipate>;
export const Default: Story = {
  render: (args) => <RouletteParticipate {...args} />,
};
