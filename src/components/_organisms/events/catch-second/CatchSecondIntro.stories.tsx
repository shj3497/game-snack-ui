import {Meta, StoryObj} from '@storybook/react';

import CatchSecondIntro from './CatchSecondIntro';

const meta: Meta<typeof CatchSecondIntro> = {
  title: 'Event/catch-second/IntroPage',
  component: CatchSecondIntro,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CatchSecondIntro>;

export const Default: Story = {
  render: () => <CatchSecondIntro />,
};
