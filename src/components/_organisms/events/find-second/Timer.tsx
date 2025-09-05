import {forwardRef, HTMLAttributes} from 'react';
import IntroducingTimer from './IntroducingTimer';
import PlayingTimer, {PlayingTimerRef} from './PlayingTimer';

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalTime?: number; // ms
  introducingTime?: number; // ms
  introducingCountTime?: number; // ms
  isPlaying?: boolean;
  isIntroducing?: boolean;
  isParticipated?: boolean;
  onIntroducingEnd?: () => void;
  onTimerEnd?: () => void;
}

const Timer = forwardRef<PlayingTimerRef, Props>(
  (
    {
      totalTime = 6000,
      introducingTime = 9000,
      introducingCountTime = 3000,
      isPlaying,
      isIntroducing,
      isParticipated,
      onIntroducingEnd,
      onTimerEnd,
      ...props
    },
    ref,
  ) => {
    if (!isParticipated) {
      return (
        <IntroducingTimer
          {...props}
          totalTime={introducingTime}
          countTime={introducingCountTime}
        />
      );
    }

    if (isIntroducing) {
      return (
        <IntroducingTimer
          {...props}
          totalTime={introducingTime}
          countTime={introducingCountTime}
          isIntroducing={isIntroducing}
          onIntroducingEnd={onIntroducingEnd}
        />
      );
    }

    return (
      <PlayingTimer
        {...props}
        ref={ref}
        isPlaying={isPlaying}
        onTimerEnd={onTimerEnd}
        totalTime={totalTime}
      />
    );
  },
);

export default Timer;
