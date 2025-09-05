import {Meta, StoryObj} from '@storybook/react';

import CatchSecondResultWin from './CatchSecondResultWin';

const meta: Meta<typeof CatchSecondResultWin> = {
  title: 'Event/catch-second/ResultWinPage',
  component: CatchSecondResultWin,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CatchSecondResultWin>;

export const Default: Story = {
  render: () => <CatchSecondResultWin />,
};
