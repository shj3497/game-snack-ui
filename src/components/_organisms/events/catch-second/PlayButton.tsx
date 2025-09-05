import GameButton from '@/components/_atoms/GameButton';
import {ButtonProps} from '@mui/material';
import {FC} from 'react';

type Props = {
  isPlaying?: boolean;
  onGameStart?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onGameStop?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & ButtonProps;

const PlayButton: FC<Props> = ({
  isPlaying = false,
  onGameStart,
  onGameStop,
  ...props
}) => {
  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onGameStart?.(event);
  };

  const handleStop = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onGameStop?.(event);
  };

  if (!isPlaying) {
    return (
      <GameButton
        {...props}
        onClick={handleStart}
        sx={{
          backgroundColor: 'game_yellow.main',
          color: '#000',
        }}
      >
        시작
      </GameButton>
    );
  }
  return (
    <GameButton
      {...props}
      onClick={handleStop}
      sx={{
        backgroundColor: 'game_pink.main',
        color: '#000',
      }}
    >
      멈춤
    </GameButton>
  );
};
export default PlayButton;
