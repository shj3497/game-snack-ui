import ResultWinEmoji from '@/components/_molecules/ResultWinEmoji';
import {styled} from '@mui/material';
import {FC, HTMLAttributes} from 'react';

import Bg1x from '@/assets/event/common/result-bg@1x.png';
import Bg2x from '@/assets/event/common/result-bg@2x.png';
import Bg3x from '@/assets/event/common/result-bg@3x.png';
import Picture, {PictureProps} from '@/components/_atoms/Picture';

interface Props extends HTMLAttributes<HTMLDivElement> {}

type ResultWinType = FC<Props> & {
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Emoji: FC;
  ButtonWrap: FC<HTMLAttributes<HTMLDivElement>>;
};

const Container = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 137px;

  img,
  picture {
    user-select: none;
    pointer-events: none;
  }
`;

const Title = styled('h2')`
  margin: 0;
  color: var(--mint, #00fcff);
  text-align: center;
  font-family: 'yangjin';
  font-size: 45px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -1px;
  white-space: pre-wrap;

  margin-bottom: 34px;
`;

const ButtonWrapBox = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 81px;
  padding: 0 21px;

  .notice {
    margin: 0;
    margin-bottom: 12px;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 23px; /* 143.75% */
    letter-spacing: -0.32px;
  }
`;

const ButtonWrap: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <ButtonWrapBox {...props}>
      <p className="notice">버튼을 누르면 리워드를 적립할 수 있습니다.</p>
      {children}
    </ButtonWrapBox>
  );
};

const sources: PictureProps['sources'] = {
  srcSet: {
    '1x': Bg1x,
    '2x': Bg2x,
  },
  type: 'image/png',
};

const ResultWin: ResultWinType = ({children, ...props}) => {
  return (
    <Container {...props}>
      <Picture
        sources={sources}
        alt="result-bg"
        src={sources.srcSet['2x']}
        sx={{
          position: 'absolute',
          zIndex: 0,
          top: 0,
          width: '660px',
          height: '100%',
        }}
      />
      {children}
    </Container>
  );
};

ResultWin.Title = Title;
ResultWin.Emoji = ResultWinEmoji;
ResultWin.ButtonWrap = ButtonWrap;

export default ResultWin;
