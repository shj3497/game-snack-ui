import ClockImg1x from '@/assets/event/catch-second/clock@1x.webp';
import ClockImg2x from '@/assets/event/catch-second/clock@2x.webp';
import ClockImg3x from '@/assets/event/catch-second/clock@3x.webp';
import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  useAnimate?: boolean;
}

const Container = styled('div')`
  display: flex;
`;

const clockSources: PictureProps['sources'] = {
  srcSet: {
    '1x': ClockImg1x,
    '2x': ClockImg2x,
  },
  type: 'image/webp',
};

const Clock: FC<Props> = ({useAnimate = false, ...props}) => {
  return (
    <Container {...props}>
      <Picture
        sources={clockSources}
        alt="시계"
        src={clockSources.srcSet['2x']}
        width={323}
        height={193}
        sx={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
};
export default Clock;
