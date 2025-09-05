import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';

import Machine1x from '@/assets/event/rps-roulette/rps_roulette-machine@1x.webp';
import Machine2x from '@/assets/event/rps-roulette/rps_roulette-machine@2x.webp';
import Machine3x from '@/assets/event/rps-roulette/rps_roulette-machine@3x.webp';
import {FC, HTMLAttributes, useCallback, useState} from 'react';
import ResultNeon, {RpsResultType} from './ResultNeon';
import RpsButtonList, {RpsType} from './RpsButtonList';
import RoulettePannel, {RpsPointType} from './RoulettePannel';
import {useNavigate} from 'react-router-dom';
import paths from '@/lib/utils/paths';
import useRpsRouletteStore from '@/lib/store/events/useRpsRoulette';
import queryString from 'query-string';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 346px;
  height: 488px;

  .result-neon {
    padding-top: 40px;
  }

  .rps-button-list {
    position: absolute;
    bottom: 52px;
  }

  .rps-roulette-pannel {
    margin-top: 30px;
  }
`;

const sources: PictureProps['sources'] = {
  srcSet: {
    '1x': Machine1x,
    '2x': Machine2x,
  },
  type: 'image/webp',
};

const RpsRouletteMachine: FC<Props> = (props) => {
  const navigate = useNavigate();
  const updateScore = useRpsRouletteStore((store) => store.updateGameScores);

  const [result, setResult] = useState<RpsResultType | null>(null);
  const [value, setValue] = useState<RpsType | null>(null);
  const [point, setPoint] = useState<RpsPointType | null>(null);

  const testCode = (resultType: RpsResultType) => {
    if (resultType === 'win') {
      setResult('win');
      setPoint(2);
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
      updateScore({type: 'fail', score: '꽝'});
      setTimeout(() => {
        navigate(paths.event.rps_roulette.result_fail);
      }, 4000);
    }
  };

  const onRpsBtnClick = (rpsType: RpsType) => {
    setValue(rpsType);
    testCode('win');
  };

  const onResultWinning = useCallback(() => {
    updateScore({type: 'success', score: '2P'});

    setTimeout(() => {
      const newUrl = queryString.stringifyUrl({
        url: paths.event.rps_roulette.result_win,
        query: {point},
      });
      navigate(newUrl);
    }, 3000);
  }, [point]);

  return (
    <RpsRouletteMachineView
      {...props}
      result={result}
      value={value}
      point={point}
      onResultWinning={onResultWinning}
      onRpsBtnClick={onRpsBtnClick}
    />
  );
};

interface RpsRouletteMachineViewProps extends Props {
  result: RpsResultType | null;
  value: RpsType | null;
  point: RpsPointType | null;
  onResultWinning?: () => void;
  onRpsBtnClick?: (rpsType: RpsType) => void;
}
export const RpsRouletteMachineView: FC<RpsRouletteMachineViewProps> = ({
  result,
  value,
  point,
  onResultWinning,
  onRpsBtnClick,
  ...props
}) => {
  return (
    <Container {...props}>
      <Picture
        sources={sources}
        alt="machine"
        src={sources.srcSet['2x']}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
      <ResultNeon className="result-neon" result={result} />
      <RoulettePannel
        className="rps-roulette-pannel"
        result={result}
        value={value}
        point={point}
        onResultWinning={onResultWinning}
      />
      <RpsButtonList
        className="rps-button-list"
        value={value}
        disabled={!!value}
        onBtnClick={onRpsBtnClick}
      />
    </Container>
  );
};

export default RpsRouletteMachine;
