import useDrawSecondStore from '@/lib/store/events/useDrawSecond';
import paths from '@/lib/utils/paths';
import {useNavigate} from 'react-router-dom';
import ResultFail from '../common/ResultFail';
import GameButton from '@/components/_atoms/GameButton';
import DrawSecondLayout from './DrawSecondLayout';

const DrawSecondResultFail = () => {
  const isLimited = useDrawSecondStore((store) => store.isLimited);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(paths.event.draw_second.participate);
  };

  const handleEnd = () => {
    navigate(paths.event.draw_second.intro);
  };

  return (
    <DrawSecondLayout>
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
                다시 그리기
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
    </DrawSecondLayout>
  );
};

export default DrawSecondResultFail;
