import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';

import TimerIcon1x from '@/assets/event/common/timer-icon@1x.webp';
import TimerIcon2x from '@/assets/event/common/timer-icon@2x.webp';
import TimerIcon3x from '@/assets/event/common/timer-icon@3x.webp';
import {FC, HTMLAttributes, ReactNode} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = styled('div')`
  position: relative;
  width: 150px;
  height: 52px;
  padding: 0px 20px 5px 50px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  &.ready {
    padding: 0px 20px 5px 50px;
    justify-content: center;
  }
  &.timer {
  }
`;

const Text = styled('p')`
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: 'yangjin';
  font-size: 27px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  // display: flex;
`;

const Item = styled('span')`
  min-width: 21px;
  &.dot {
    min-width: 8.5px;
  }
`;

type TimerViewProps = FC<Props> & {
  Text: FC<HTMLAttributes<HTMLParagraphElement>>;
  TextItem: FC<HTMLAttributes<HTMLSpanElement>>;
};

const sources: PictureProps['sources'] = {
  srcSet: {
    '1x': TimerIcon1x,
    '2x': TimerIcon2x,
  },
  type: 'image/webp',
};

const TimerView: TimerViewProps = ({children, ...props}) => {
  return (
    <Container {...props}>
      <Picture
        sources={sources}
        alt="timer"
        src={sources.srcSet['2x']}
        width={110}
        height={88}
        sx={{
          position: 'absolute',
          left: '-60px',
          bottom: '-9px',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
      {children}
    </Container>
  );
};

TimerView.Text = Text;
TimerView.TextItem = Item;

export default TimerView;
