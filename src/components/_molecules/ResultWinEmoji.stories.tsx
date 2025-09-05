import {Meta, StoryObj} from '@storybook/react';

import ResultWinEmoji from './ResultWinEmoji';
import {Box} from '@mui/material';

const meta: Meta<typeof ResultWinEmoji> = {
  title: '_Molecules/ResultWinEmoji',
  component: ResultWinEmoji,
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

type Story = StoryObj<typeof ResultWinEmoji>;
export const Default: Story = {
  render: () => <ResultWinEmoji />,
};
