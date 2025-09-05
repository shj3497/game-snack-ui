import {forwardRef, useImperativeHandle, useState} from 'react';
import {CardItem, FlipCardContainer} from './FindBoxSection';
import FlipCard from './FlipCard';

interface Props {
  cards: CardItem[];
  onGameEnd?: () => void;
  disabled?: boolean;
}

export type PlayingFlipCardsRef = {
  getOpenCards: () => string[];
};

const PlayingFlipCards = forwardRef<PlayingFlipCardsRef, Props>(
  ({cards, onGameEnd, disabled}, ref) => {
    const maxNum = cards.filter((card) => card.value !== '').length;

    //? 오픈 되어진 카드
    const [openCards, setOpenCards] = useState<string[]>([]);

    //? 오픈 되어져야 할 카드 flip 모션용
    const [willOpenCards, setWillOpenCards] = useState<number[]>([]);

    const isCardOpenable = (index: number) => {
      if (disabled) return false;
      if (openCards.length === maxNum) return false;
      return !willOpenCards.includes(index);
    };

    const flipBackCard = (index: number) => {
      setTimeout(() => {
        setWillOpenCards((prev) => prev.filter((i) => i !== index));
      }, 600);
    };

    const handleCorrectCard = (cardValue: string) => {
      setOpenCards((prev) => [...prev, cardValue]);

      if (cardValue === maxNum.toString()) {
        onGameEnd?.();
      }
    };

    const handleClick = (cardValue: string, index: number) => {
      if (!isCardOpenable(index)) return;

      setWillOpenCards((prev) => [...prev, index]);

      if (cardValue === '') {
        flipBackCard(index);
        return;
      }

      const nextValue = (openCards.length + 1).toString();

      if (cardValue !== nextValue) {
        flipBackCard(index);
      } else {
        handleCorrectCard(cardValue);
      }
    };

    useImperativeHandle(ref, () => ({
      getOpenCards: () => openCards,
    }));

    return (
      <FlipCardContainer>
        {cards.map((card, index) => (
          <FlipCard
            key={index}
            cardValue={card.value}
            onClick={() => {
              handleClick(card.value, index);
            }}
            isFlip={willOpenCards.includes(index)}
          />
        ))}
      </FlipCardContainer>
    );
  },
);

export default PlayingFlipCards;
