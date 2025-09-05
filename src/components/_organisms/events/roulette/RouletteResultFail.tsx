import ResultFail from '../common/ResultFail';
import RouletteLayout from './RouletteLayout';
import GameButton from '@/components/_atoms/GameButton';
import {useNavigate} from 'react-router-dom';
import useRouletteStore from '@/lib/store/events/useRoulette';
import paths from '@/lib/utils/paths';

const RouletteResultFail = () => {
  const isLimited = useRouletteStore((store) => store.isLimited);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEnd = () => {
    navigate(paths.event.roulette.intro);
  };

  return (
    <RouletteLayout>
      <ResultFail>
        <ResultFail.Title>
          아쉬워요~
          <br />
          다음에 다시 도전해보세요!
        </ResultFail.Title>
        <ResultFail.Emoji />
        <ResultFail.ButtonWrap>
          {isLimited ? (
            <GameButton
              onClick={handleEnd}
              sx={{backgroundColor: 'game_mint.main', color: '#000'}}
            >
              다음 혜택보기
            </GameButton>
          ) : (
            <>
              <GameButton
                onClick={handleBack}
                sx={{backgroundColor: 'game_mint.main', color: '#000'}}
              >
                다시 돌리기
              </GameButton>
            </>
          )}
        </ResultFail.ButtonWrap>
      </ResultFail>
    </RouletteLayout>
  );
};
export default RouletteResultFail;
