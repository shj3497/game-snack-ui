import {styled} from '@mui/material';
import {forwardRef, HTMLAttributes, useMemo} from 'react';
import IntroducingFlipCards from './IntroducingFlipCards';
import PlayingFlipCards, {PlayingFlipCardsRef} from './PlayingFlipCards';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isIntroducing?: boolean;
  isPlaying?: boolean;
  isParticipated?: boolean;
  isFinish?: boolean;
  searchCount?: number;
  onGameEnd?: (isSuccess?: boolean) => void;
}

export const FlipCardContainer = styled('div')`
  width: 284px;
  height: 284px;
  padding: 10px;
  background-color: #003c94;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  grid-template-rows: repeat(4, minmax(60px, 1fr));
  gap: 8px;
`;

export type CardItem = {
  value: string;
  isFlip: boolean;
};

const FindBoxSection = forwardRef<PlayingFlipCardsRef, Props>(
  (
    {
      isIntroducing,
      isPlaying,
      isParticipated,
      isFinish,
      searchCount = 5,
      onGameEnd,
      ...props
    },
    ref,
  ) => {
    const generateCards = (count: number): CardItem[] => {
      const arrayLength = 16;
      const array: CardItem[] = Array(arrayLength).fill({
        value: '',
        isFlip: false,
      });
      let insertedCount = 1;
      while (insertedCount < count + 1) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        if (array[randomIndex].value === '') {
          array[randomIndex] = {
            value: `${insertedCount}`,
            isFlip: false,
          };
          insertedCount++;
        }
      }
      return array;
    };

    const cards = useMemo(() => {
      return generateCards(searchCount);
    }, [searchCount]);

    if (!isParticipated) {
      return <IntroducingFlipCards cards={cards} />;
    }

    if (isIntroducing) {
      return <IntroducingFlipCards cards={cards} isFlip />;
    }

    return (
      <PlayingFlipCards
        ref={ref}
        cards={cards}
        onGameEnd={() => {
          onGameEnd?.(true);
        }}
        disabled={isFinish}
      />
    );
  },
);

export default FindBoxSection;
