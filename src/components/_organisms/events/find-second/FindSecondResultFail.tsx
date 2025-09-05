import GameButton from '@/components/_atoms/GameButton';
import ResultFail from '../common/ResultFail';
import FindSecondLayout from './FindSecondLayout';
import paths from '@/lib/utils/paths';
import {useNavigate} from 'react-router-dom';
import useFindSecondStore from '@/lib/store/events/useFindSecond';

const FindSecondResultFail = () => {
  const isLimited = useFindSecondStore((store) => store.isLimited);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(paths.event.find_second.participate);
  };

  const handleEnd = () => {
    navigate(paths.event.find_second.intro);
  };
  return (
    <FindSecondLayout>
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
                다시 찾기
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
    </FindSecondLayout>
  );
};

export default FindSecondResultFail;
