import {styled} from '@mui/material';
import CircleMotion from '../_atoms/CircleMotion';
import {FC, useEffect, useState} from 'react';
import {motion, Variants} from 'framer-motion';
import classNames from 'classnames';
import CheckMotion from '../_atoms/CheckMotion';

interface Props {
  successColor?: string;
  failColor?: string;
  defaultColor?: string;
  type?: 'success' | 'fail' | 'normal';
  countText?: string;
  scoreText?: string | null;

  useAnimate?: boolean;
}

const Container = styled(motion.div)``;

const CircleWrap = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
  height: 62px;
  .circle-motion {
    position: absolute;
    top: 0;
  }
  .check-motion {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const CountText = styled('p')`
  position: relative;
  z-index: 10;
  margin: 0;
  color: #fff;
  font-family: 'Pretendard';
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;

const PointText = styled(motion.p)<{fontcolor?: string}>`
  margin: 7px 0 0 0;

  text-align: center;
  font-family: 'Pretendard';
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.3px;

  color: ${({fontcolor}) => fontcolor};
  &.normal {
    color: #fff;
  }
`;

const GameCountItem: FC<Props> = ({
  successColor = '#00FFBC',
  failColor = '#ff5dcc',
  defaultColor,
  type = 'normal',
  countText = '1회',
  scoreText = '-',
  useAnimate = false,
}) => {
  const [active, setActive] = useState(false);
  const variants: Variants = {
    hidden: {opacity: 0, y: 10},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        type: 'spring',
        duration: 0.5,
        bounce: 0,
      },
    },
  };

  let activeColor = successColor;

  if (type === 'normal') {
    activeColor = 'transparent';
  } else if (type === 'fail') {
    activeColor = failColor;
  }

  useEffect(() => {
    if (!useAnimate) return;
    const timeout = setTimeout(() => setActive(true), 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [useAnimate]);

  return (
    <Container
      initial={useAnimate ? 'hidden' : 'visible'}
      animate={active ? 'visible' : 'hidden'}
    >
      <CircleWrap>
        <CircleMotion
          className="circle-motion"
          activeColor={activeColor}
          defaultColor={defaultColor}
          initial={!useAnimate && 'visible'}
        />
        <CheckMotion
          className="check-motion"
          activeColor={activeColor}
          type={type}
          initial={!useAnimate && 'visible'}
        />
        <CountText>{countText}</CountText>
      </CircleWrap>

      <PointText
        className={classNames(type)}
        fontcolor={activeColor}
        initial={!useAnimate && 'visible'}
        variants={variants}
      >
        {scoreText}
      </PointText>
    </Container>
  );
};
export default GameCountItem;
