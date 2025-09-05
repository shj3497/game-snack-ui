import {Meta, StoryObj} from '@storybook/react';

import FindSecondIntro from './FindSecondIntro';

const meta: Meta<typeof FindSecondIntro> = {
  title: 'Event/find-second/IntroPage',
  component: FindSecondIntro,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FindSecondIntro>;

export const Default: Story = {
  render: () => <FindSecondIntro />,
};
