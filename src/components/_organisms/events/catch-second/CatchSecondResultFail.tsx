import GameButton from '@/components/_atoms/GameButton';
import ResultFail from '../common/ResultFail';
import {useNavigate} from 'react-router-dom';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';
import paths from '@/lib/utils/paths';
import CatchSecondLayout from './CatchSecondLayout';

const CatchSecondResultFail = () => {
  const isLimited = useCatchSecondStore((store) => store.isLimited);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(paths.event.catch_second.participate);
  };

  const handleEnd = () => {
    navigate(paths.event.catch_second.intro);
  };
  return (
    <CatchSecondLayout>
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
              sx={{backgroundColor: 'game_green.main', color: '#000'}}
            >
              다음 혜택보기
            </GameButton>
          ) : (
            <>
              <GameButton
                onClick={handleBack}
                sx={{backgroundColor: 'game_green.main', color: '#000'}}
              >
                다시 잡기
              </GameButton>
              <ResultFail.TextButton
                variant="text"
                onClick={handleEnd}
                sx={{color: '#000'}}
              >
                끝내기
              </ResultFail.TextButton>
            </>
          )}
        </ResultFail.ButtonWrap>
      </ResultFail>
    </CatchSecondLayout>
  );
};
export default CatchSecondResultFail;
