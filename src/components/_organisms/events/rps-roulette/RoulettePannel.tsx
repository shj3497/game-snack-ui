import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import {FC} from 'react';
import Pannel1x from '@/assets/event/rps-roulette/pannel@1x.webp';
import Pannel2x from '@/assets/event/rps-roulette/pannel@2x.webp';
import Pannel3x from '@/assets/event/rps-roulette/pannel@3x.webp';
import RoulettePannelEffect from './RoulettePannelEffect';
import {RpsType} from './RpsButtonList';
import {RpsResultType} from './ResultNeon';
import PcRpsPicture from './PcRpsPicture';

interface Props {
  result: RpsResultType | null;
  value: RpsType | null;
  point: RpsPointType | null;
  onResultWinning?: () => void;
  className?: string;
}

const Container = styled('div')`
  position: relative;
  width: 222px;
  height: 222px;
  display: flex;
  align-items: center;

  * {
    user-select: none;
    pointer-events: none;
  }
`;

const pannelSource: PictureProps['sources'] = {
  srcSet: {
    '1x': Pannel1x,
    '2x': Pannel2x,
  },
  type: 'image/webp',
};

export type RpsPointType = 1 | 2 | 3;

const RoulettePannel: FC<Props> = ({
  result,
  value,
  point,
  onResultWinning,
  className,
}) => {
  return (
    <Container className={className}>
      <Picture
        sources={pannelSource}
        alt=""
        src={pannelSource.srcSet['2x']}
        width="222px"
        height="222px"
        sx={{position: 'absolute', top: 0, left: 0}}
      />
      <RoulettePannelEffect point={point} onRouletteEnd={onResultWinning} />
      <PcRpsPicture value={value} result={result} />
    </Container>
  );
};

export default RoulettePannel;
