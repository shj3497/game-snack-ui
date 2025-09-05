import {Meta, StoryObj} from '@storybook/react';

import CatchSecondParticipate from './CatchSecondParticipate';

const meta: Meta<typeof CatchSecondParticipate> = {
  title: 'Event/catch-second/ParticipatePage',
  component: CatchSecondParticipate,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CatchSecondParticipate>;

export const Default: Story = {
  render: () => <CatchSecondParticipate />,
};
