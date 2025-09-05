import {Meta, StoryObj} from '@storybook/react';
import RpsButtonList from './RpsButtonList';
import {Box} from '@mui/material';

const meta: Meta<typeof RpsButtonList> = {
  title: 'Event/rps-roulette/RpsButtonList',
  component: RpsButtonList,
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
    value: {
      control: {type: 'select'}, // select 컨트롤 추가
      options: ['rock', 'paper', 'scissors', undefined], // 선택 가능한 값
      description: 'RPS type',
      defaultValue: undefined, // 기본값 설정
    },
  },
};

export default meta;

type Story = StoryObj<typeof RpsButtonList>;

export const Default: Story = {
  render: (args) => <RpsButtonList {...args} />,
};

export const Rock: Story = {
  render: (args) => <RpsButtonList {...args} />,
  args: {value: 'rock'},
};

export const Paper: Story = {
  render: (args) => <RpsButtonList {...args} />,
  args: {value: 'paper'},
};

export const Scissors: Story = {
  render: (args) => <RpsButtonList {...args} />,
  args: {value: 'scissors'},
};
