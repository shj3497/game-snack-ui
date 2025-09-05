import {styled} from '@mui/material';
import RpsRouletteLayout from './RpsRouletteLayout';
import RpsRouletteGameScoreIndicator from './RpsRouletteGameScoreIndicator';
import RpsRouletteMachine from './RpsRouletteMachine';

interface Props {}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .rps_roulette-machine {
    margin-top: 20px;
  }
`;

const RpsRouletteParticipate = () => {
  return (
    <RpsRouletteLayout>
      <Inner>
        <RpsRouletteGameScoreIndicator />
        <RpsRouletteMachine className="rps_roulette-machine" />
      </Inner>
    </RpsRouletteLayout>
  );
};
export default RpsRouletteParticipate;
