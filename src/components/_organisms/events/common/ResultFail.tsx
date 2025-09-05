import ResultFailEmoji from '@/components/_molecules/ResultFailEmoji';
import {Button as MuiButton, ButtonProps, styled, Box} from '@mui/material';
import {FC, HTMLAttributes} from 'react';

import Bg1x from '@/assets/event/common/result-bg@1x.png';
import Bg2x from '@/assets/event/common/result-bg@2x.png';
import Bg3x from '@/assets/event/common/result-bg@3x.png';
import Picture, {PictureProps} from '@/components/_atoms/Picture';

interface Props extends HTMLAttributes<HTMLDivElement> {}

type ResultFailType = FC<Props> & {
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Emoji: FC;
  TextButton: FC<ButtonProps>;
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
  color: #fff;
  text-align: center;
  font-family: 'yangjin';
  font-size: 30px;
  font-style: normal;
  font-weight: 500;

  letter-spacing: -0.6px;

  margin-bottom: 28px;
`;

const TextButton = styled(MuiButton)`
  position: absolute;
  bottom: -41px;

  color: #fff;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.28px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;

const sources: PictureProps['sources'] = {
  srcSet: {
    '1x': Bg1x,
    '2x': Bg2x,
  },
  type: 'image/png',
};

const ButtonWrap: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Box width="360px" position="absolute" bottom="81px" px="21px">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        {props.children}
      </Box>
    </Box>
  );
};

const ResultFail: ResultFailType = ({children, ...props}) => {
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

ResultFail.Title = Title;
ResultFail.Emoji = ResultFailEmoji;
ResultFail.TextButton = TextButton;
ResultFail.ButtonWrap = ButtonWrap;

export default ResultFail;
