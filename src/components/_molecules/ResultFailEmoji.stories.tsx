import {Meta, StoryObj} from '@storybook/react';

import ResultFailEmoji from './ResultFailEmoji';
import {Box} from '@mui/material';

const meta: Meta<typeof ResultFailEmoji> = {
  title: '_Molecules/ResultFailEmoji',
  component: ResultFailEmoji,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box p={2} width="fit-content" sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ResultFailEmoji>;
export const Default: Story = {
  render: () => <ResultFailEmoji />,
};
