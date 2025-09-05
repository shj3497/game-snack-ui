import {Meta, StoryObj} from '@storybook/react';
import ResultNeon from './ResultNeon';
import {Box} from '@mui/material';

const meta: Meta<typeof ResultNeon> = {
  title: 'Event/rps-roulette/ResultNeon',
  component: ResultNeon,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        height="100vh"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    result: {
      control: {type: 'select'}, // select 컨트롤 추가
      options: ['win', 'tie', 'lose', undefined], // 선택 가능한 값
      description: 'Result type',
      defaultValue: undefined, // 기본값 설정
    },
  },
};

export default meta;

type Story = StoryObj<typeof ResultNeon>;

export const Default: Story = {
  render: (args) => <ResultNeon {...args} />,
};

export const Win: Story = {
  render: (args) => <ResultNeon {...args} />,
  args: {result: 'win'},
};

export const Tie: Story = {
  render: (args) => <ResultNeon {...args} />,
  args: {result: 'tie'},
};

export const Lose: Story = {
  render: (args) => <ResultNeon {...args} />,
  args: {result: 'lose'},
};
