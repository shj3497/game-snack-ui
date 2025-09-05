import {Meta, StoryObj} from '@storybook/react';

import FindSecondResultFail from './FindSecondResultFail';

const meta: Meta<typeof FindSecondResultFail> = {
  title: 'Event/find-second/ResultFailPage',
  component: FindSecondResultFail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FindSecondResultFail>;

export const Default: Story = {
  render: () => <FindSecondResultFail />,
};
