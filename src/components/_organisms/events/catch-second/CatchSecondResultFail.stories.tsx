import {Meta, StoryObj} from '@storybook/react';

import CatchSecondResultFail from './CatchSecondResultFail';

const meta: Meta<typeof CatchSecondResultFail> = {
  title: 'Event/catch-second/ResultFailPage',
  component: CatchSecondResultFail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CatchSecondResultFail>;

export const Default: Story = {
  render: () => <CatchSecondResultFail />,
};
