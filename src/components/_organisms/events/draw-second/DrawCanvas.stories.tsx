import {Meta, StoryObj} from '@storybook/react';
import DrawCanvas from './DrawCanvas';
import {Box} from '@mui/material';

const meta: Meta<typeof DrawCanvas> = {
  title: 'Event/draw-second/DrawCanvas',
  component: DrawCanvas,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DrawCanvas>;

export const Square: Story = {
  render: (args) => <DrawCanvas {...args} />,
  args: {
    diagram: 'square',
  },
};

export const Circle: Story = {
  render: (args) => <DrawCanvas {...args} />,
  args: {
    diagram: 'circle',
  },
};

export const Pentagon: Story = {
  render: (args) => <DrawCanvas {...args} />,
  args: {
    diagram: 'pentagon',
  },
};

export const Rhombus: Story = {
  render: (args) => <DrawCanvas {...args} />,
  args: {
    diagram: 'rhombus',
  },
};

export const Triangle: Story = {
  render: (args) => <DrawCanvas {...args} />,
  args: {
    diagram: 'triangle',
  },
};
