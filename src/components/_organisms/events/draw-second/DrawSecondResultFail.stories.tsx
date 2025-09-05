import {Meta, StoryObj} from '@storybook/react';
import DrawSecondResultFail from './DrawSecondResultFail';

const meta: Meta<typeof DrawSecondResultFail> = {
  title: 'Event/draw-second/ResultFailPage',
  component: DrawSecondResultFail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawSecondResultFail>;

export const Default: Story = {
  render: () => <DrawSecondResultFail />,
};
