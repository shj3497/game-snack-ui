import {styled} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isFlip?: boolean;
  flipDelay?: number; // ms
  cardValue?: string;
}

const Container = styled('div')`
  perspective: 108px;
  width: 100%;
  max-width: 60px;
  height: auto;
  aspect-ratio: 1 / 1;
`;

const Inner = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
  transform: rotateY(0);

  &.isFlip {
    transform: rotateY(180deg);
  }
`;

const Front = styled('div')`
  width: 100%;
  height: 100%;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);

  position: absolute;
  backface-visibility: hidden;
`;

const Back = styled('div')`
  width: 100%;
  height: 100%;

  position: absolute;
  backface-visibility: hidden;
`;

const Card = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    z-index: 3;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &.card-back {
    background-color: #a7a7a7;
    border-color: #c6c6c6;

    .text {
      color: #a7a7a7;
      z-index: 7;
    }
    ::before {
      background-color: #9e9e9e;
    }
  }

  &.card-front {
    background-color: #00ffbc;
    border-color: #88ffdd;
    .text {
      color: #000;
      z-index: 8;
    }

    ::before {
      background-color: #00e7a8;
    }
  }
`;

const Text = styled('span')`
  position: relative;
  z-index: 10;
  font-size: 22px;
  font-family: 'Pretendard';
  line-height: 100%;
  font-weight: 700;
  letter-spacing: -0.44px;
  user-select: none;
  pointer-events: none;
`;

const FlipCard: FC<Props> = ({
  cardValue = '',
  isFlip,
  flipDelay = 0,
  ...props
}) => {
  return (
    <Container {...props}>
      <Inner
        className={classNames({isFlip})}
        sx={{transitionDelay: `${flipDelay}ms`}}
      >
        <Front>
          <Card className="card-front">
            <Text className="text">{cardValue}</Text>
          </Card>
        </Front>
        <Back>
          <Card className="card-back">
            <Text className="text">?</Text>
          </Card>
        </Back>
      </Inner>
    </Container>
  );
};

export default FlipCard;
