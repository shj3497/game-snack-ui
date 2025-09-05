import {styled} from '@mui/material';
import {FC, HTMLAttributes, useRef} from 'react';
import DrawCanvas from './DrawCanvas';
import {DiagramType} from '@/lib/utils/draw-second';
import DrawCanvasGuideline from './DrawCanvasGuideline';
import {useCountUp} from 'react-countup';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isPlaying?: boolean;
  isFinish?: boolean;
  diagram: DiagramType;
  onGameEnd?: (score: number) => void;
}

const Container = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuideLineWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .notice-wrap {
    position: absolute;
    text-align: center;
    font-family: Pretendard;

    &.triangle {
      padding-top: 50px;
    }

    .notice {
      margin: 0;
      color: #fff;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: 23px;
      letter-spacing: -0.34px;
      span {
        color: #00ffbc;
      }
    }
    .sub-notice {
      margin: 0;
      color: #fff;
      font-size: 13px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: -0.26px;
    }
  }
`;

const Text = styled('p')`
  margin: 0;
  position: absolute;

  opacity: 0;
  color: var(--green, #00ffbc);
  text-align: center;
  font-family: 'yangjin';
  font-size: 40px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.8px;
  line-height: 1.5;
  display: flex;
  align-items: center;

  &.isView {
    opacity: 1;
  }
`;

const DrawingSection: FC<Props> = ({
  isPlaying = false,
  isFinish = false,
  diagram,
  onGameEnd,
  ...props
}) => {
  const countUpRef = useRef<HTMLElement>(null);
  const {update} = useCountUp({
    ref: countUpRef as any,
    start: 0,
    end: 0,
    useEasing: true,
  });

  const onDrawEnd = (score?: number) => {
    if (score === undefined) return;
    onGameEnd?.(score);
    setTimeout(() => {
      update(score);
    }, 1000);
  };

  return (
    <Container {...props}>
      {!isPlaying ? (
        <GuideLineWrap>
          <DrawCanvasGuideline diagram={diagram} />
          <div className={classNames('notice-wrap', diagram)}>
            <p className="notice">
              <span>제한시간 내</span>
              <br />
              완성하면 성공
            </p>
            <p className="sub-notice">가이드라인 65%이상 일치 시</p>
          </div>
        </GuideLineWrap>
      ) : (
        <DrawCanvas
          diagram={diagram}
          isFinish={isFinish}
          onDrawEnd={onDrawEnd}
        />
      )}

      <Text className={classNames({isView: isFinish})}>
        <span ref={countUpRef} />
        <span>%</span>
      </Text>
    </Container>
  );
};
export default DrawingSection;
