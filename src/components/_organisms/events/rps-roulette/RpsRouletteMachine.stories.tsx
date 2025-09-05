import {Meta, StoryObj} from '@storybook/react';

import {RpsRouletteMachineView} from './RpsRouletteMachine';
import {useState} from 'react';
import {RpsResultType} from './ResultNeon';
import {RpsType} from './RpsButtonList';
import {RpsPointType} from './RoulettePannel';

const meta: Meta<typeof RpsRouletteMachineView> = {
  title: 'Event/rps-roulette/Machine',
  component: RpsRouletteMachineView,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {type: 'select'}, // select 컨트롤 추가
      options: ['win', 'tie', 'lose'], // 선택 가능한 값
      description: 'Roulette result type',
      defaultValue: 'win', // 기본값 설정
    },
    story_point: {
      control: {type: 'select'},
      options: [1, 2, 3], // 선택 가능한 값
      description: 'Roulette point value',
      defaultValue: 1, // 기본값 설정
    },
  } as any,
};
export default meta;
type Story = StoryObj<StoryArgs>;

interface StoryArgs {
  type?: RpsResultType;
  story_point?: RpsPointType;
}

const Template = (args: StoryArgs) => {
  const [result, setResult] = useState<RpsResultType | null>(null);
  const [value, setValue] = useState<RpsType | null>(null);
  const [point, setPoint] = useState<RpsPointType | null>(null);

  const testCode = (resultType: RpsResultType) => {
    if (resultType === 'win') {
      setResult('win');
      setPoint(args.story_point as RpsPointType);
    } else if (resultType === 'tie') {
      setResult('tie');
      setPoint(null);

      setTimeout(() => {
        setResult(null);
        setValue(null);
        setPoint(null);
      }, 2000);
    } else if (resultType === 'lose') {
      setResult('lose');
      setPoint(null);
    }
  };

  const onRpsBtnClick = (rpsType: RpsType) => {
    setValue(rpsType);
    testCode(args.type as RpsResultType);
  };

  return (
    <RpsRouletteMachineView
      result={result}
      value={value}
      point={point}
      onRpsBtnClick={onRpsBtnClick}
    />
  );
};

export const Win: Story = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'win',
    story_point: 2,
  } as StoryArgs,
};

export const Lose: Story = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'lose',
    story_point: 2,
  },
};

export const Tie: Story = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'tie',
    story_point: 2,
  },
};
