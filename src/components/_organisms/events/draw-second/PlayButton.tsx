import GameButton from '@/components/_atoms/GameButton';
import {ButtonProps} from '@mui/material';
import {FC} from 'react';

type Props = {
  isPlaying?: boolean;
  onGameStart?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
} & ButtonProps;

const PlayButton: FC<Props> = ({isPlaying = false, onGameStart, ...props}) => {
  const handleStart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onGameStart?.(event);
  };

  if (isPlaying) {
    return null;
  }

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
};
export default PlayButton;
