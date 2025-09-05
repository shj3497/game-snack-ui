import {Meta, StoryObj} from '@storybook/react';

import SecondGameLayout from './SecondGameLayout';

const meta: Meta<typeof SecondGameLayout> = {
  title: 'Event/common/SecondGameLayout',
  component: SecondGameLayout,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SecondGameLayout>;

export const Default: Story = {
  render: () => <SecondGameLayout />,
};
