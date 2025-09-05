import {FC, useEffect, useState} from 'react';
import {CardItem, FlipCardContainer} from './FindBoxSection';
import FlipCard from './FlipCard';

interface Props {
  isFlip?: boolean;
  cards: CardItem[];
}

const IntroducingFlipCards: FC<Props> = ({cards, isFlip: _isFlip}) => {
  const [isFlip, setIsFlip] = useState(_isFlip);

  useEffect(() => {
    if (!_isFlip) return;
    setIsFlip(true);
    const flipTimeout = setTimeout(() => {
      setIsFlip(false);
    }, 5000);

    return () => {
      clearTimeout(flipTimeout);
    };
  }, [_isFlip]);

  return (
    <FlipCardContainer>
      {cards.map((card, index) => (
        <FlipCard
          key={index}
          flipDelay={100 * index}
          isFlip={isFlip}
          cardValue={card.value}
        />
      ))}
    </FlipCardContainer>
  );
};

export default IntroducingFlipCards;
