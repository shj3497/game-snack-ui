import {Meta, StoryObj} from '@storybook/react';
import DrawCanvasGuideline from './DrawCanvasGuideline';
import {Box} from '@mui/material';

const meta: Meta<typeof DrawCanvasGuideline> = {
  title: 'Event/draw-second/DrawCanvasGuideline',
  component: DrawCanvasGuideline,
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

type Story = StoryObj<typeof DrawCanvasGuideline>;

export const Square: Story = {
  render: (args) => <DrawCanvasGuideline {...args} />,
  args: {
    diagram: 'square',
  },
};

export const Circle: Story = {
  render: (args) => <DrawCanvasGuideline {...args} />,
  args: {
    diagram: 'circle',
  },
};

export const Pentagon: Story = {
  render: (args) => <DrawCanvasGuideline {...args} />,
  args: {
    diagram: 'pentagon',
  },
};

export const Rhombus: Story = {
  render: (args) => <DrawCanvasGuideline {...args} />,
  args: {
    diagram: 'rhombus',
  },
};

export const Triangle: Story = {
  render: (args) => <DrawCanvasGuideline {...args} />,
  args: {
    diagram: 'triangle',
  },
};
