import {Meta, StoryObj} from '@storybook/react';
import DrawSecondParticipate from './DrawSecondParticipate';

const meta: Meta<typeof DrawSecondParticipate> = {
  title: 'Event/draw-second/ParticipatePage',
  component: DrawSecondParticipate,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DrawSecondParticipate>;

export const Default: Story = {
  render: () => <DrawSecondParticipate />,
};
