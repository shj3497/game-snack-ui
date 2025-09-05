import {Meta, StoryObj} from '@storybook/react';
import FindBoxSection from './FindBoxSection';
import {Box, Button} from '@mui/material';
import {useState} from 'react';

const meta: Meta<typeof FindBoxSection> = {
  title: 'Event/find-second/FindBoxSection',
  component: FindBoxSection,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FindBoxSection>;

const Template = (args: any) => {
  const [playState, setPlayState] = useState({
    isPlaying: false, // 유저가 카드 실제 선택중 여부
    isIntroducing: false, // 유저가 카드 선택하기 이전인 카드 소개중 여부
    isParticipated: false, // 게임 참여 여부
    isDisabled: false, // 게임 참가 불가 여부
    isFinish: false, // 게임 종료 여부
  });

  const onIntroducingStart = () => {
    setPlayState({
      isPlaying: false,
      isIntroducing: true,
      isParticipated: true,
      isDisabled: false,
      isFinish: false,
    });
    setTimeout(() => {
      onGameStart();
    }, 8000);
  };

  const onGameStart = () => {
    setPlayState({
      isPlaying: true,
      isIntroducing: false,
      isParticipated: true,
      isDisabled: false,
      isFinish: false,
    });
  };

  const onGameEnd = () => {
    setPlayState({
      isPlaying: false,
      isIntroducing: false,
      isParticipated: true,
      isDisabled: false,
      isFinish: true,
    });
  };
  return (
    <Box>
      <FindBoxSection
        {...args}
        isIntroducing={playState.isIntroducing}
        isPlaying={playState.isPlaying}
        isParticipated={playState.isParticipated}
        isFinish={playState.isFinish}
        searchCount={5}
        onGameEnd={onGameEnd}
      />
      <Button variant="contained" onClick={onIntroducingStart}>
        Start
      </Button>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {},
};
