import {Meta, StoryObj} from '@storybook/react';

import {
  RouletteView,
  Props as RouletteViewProps,
  RouletteViewRef,
} from './RouletteView';
import React, {useState} from 'react';
import {Box} from '@mui/material';

const meta: Meta<typeof RouletteView> = {
  title: 'Event/roulette/Roulette',
  component: RouletteView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box width="360px" p={1} sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    point: {
      control: {type: 'select'}, // select 컨트롤 추가
      options: [0, 1], // 선택 가능한 값
      description: 'Roulette point value',
      defaultValue: 0, // 기본값 설정
    },
  } as any,
};
export default meta;

type Story = StoryObj<typeof RouletteView>;

// Storybook에서만 사용할 point 속성을 추가한 타입 정의
interface StoryArgs extends RouletteViewProps {
  point?: number;
}

const Template = (args: StoryArgs & React.RefAttributes<RouletteViewRef>) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const ref = React.useRef<RouletteViewRef>(null);

  const disabled = isAnimating;

  const onStart = () => {
    if (disabled) return;
    setIsAnimating(true);
    if (args.point !== undefined) {
      ref.current?.rotateRoulette(args.point); // point가 있을 경우에만 사용
    }
  };

  return <RouletteView {...args} ref={ref} onStart={onStart} />;
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
};
