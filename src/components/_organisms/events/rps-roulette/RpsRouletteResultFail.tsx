import ResultFail from '../common/ResultFail';
import RpsRouletteLayout from './RpsRouletteLayout';
import GameButton from '@/components/_atoms/GameButton';
import {useNavigate} from 'react-router-dom';
import paths from '@/lib/utils/paths';
import useRpsRouletteStore from '@/lib/store/events/useRpsRoulette';

const RpsRouletteResultFail = () => {
  const isLimited = useRpsRouletteStore((store) => store.isLimited);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEnd = () => {
    navigate(paths.event.rps_roulette.intro);
  };

  return (
    <RpsRouletteLayout>
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
                다시잡기
              </GameButton>
              <ResultFail.TextButton variant="text">
                끝내기
              </ResultFail.TextButton>
            </>
          )}
        </ResultFail.ButtonWrap>
      </ResultFail>
    </RpsRouletteLayout>
  );
};
export default RpsRouletteResultFail;
