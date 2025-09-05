import {styled} from '@mui/material';
import GameCountItem from './GameCountItem';
import {FC, HTMLAttributes} from 'react';
import {GameScoreStore} from '@/lib/store/events/common/game-score';

interface Props extends HTMLAttributes<HTMLDivElement> {
  gameScores?: GameScoreStore['gameScores'];
  successColor?: string;
}

const Container = styled('div')`
  width: 100%;
  padding: 16px 37px 13px 37px;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
`;

const GameScoreIndicator: FC<Props> = ({
  gameScores,
  successColor,
  ...props
}) => {
  return (
    <Container {...props}>
      {gameScores?.map((gameScore, index) => (
        <GameCountItem
          key={`${gameScore.type}-${index}`}
          type={gameScore.type}
          countText={`${index + 1}회`}
          scoreText={gameScore.score}
          successColor={successColor}
          useAnimate={gameScore.useAnimate}
        />
      ))}
    </Container>
  );
};
export default GameScoreIndicator;
