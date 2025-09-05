import {Meta, StoryObj} from '@storybook/react';

import DrawSecondIntro from './DrawSecondIntro';

const meta: Meta<typeof DrawSecondIntro> = {
  title: 'Event/draw-second/IntroPage',
  component: DrawSecondIntro,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawSecondIntro>;

export const Default: Story = {
  render: () => <DrawSecondIntro />,
};
