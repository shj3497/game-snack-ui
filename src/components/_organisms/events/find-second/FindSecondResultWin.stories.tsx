import {Meta, StoryObj} from '@storybook/react';

import FindSecondResultWin from './FindSecondResultWin';

const meta: Meta<typeof FindSecondResultWin> = {
  title: 'Event/find-second/ResultWinPage',
  component: FindSecondResultWin,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FindSecondResultWin>;

export const Default: Story = {
  render: () => <FindSecondResultWin />,
};
