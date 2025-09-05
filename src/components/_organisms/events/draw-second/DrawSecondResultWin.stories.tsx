import {Meta, StoryObj} from '@storybook/react';
import DrawSecondResultWin from './DrawSecondResultWin';

const meta: Meta<typeof DrawSecondResultWin> = {
  title: 'Event/draw-second/ResultWinPage',
  component: DrawSecondResultWin,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DrawSecondResultWin>;

export const Default: Story = {
  render: () => <DrawSecondResultWin />,
};
