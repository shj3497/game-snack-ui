import {Meta, StoryObj} from '@storybook/react';
import PlayingFlipCards from './PlayingFlipCards';
import {CardItem} from './FindBoxSection';

const meta: Meta<typeof PlayingFlipCards> = {
  title: 'Event/find-second/PlayingFlipCards',
  component: PlayingFlipCards,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlayingFlipCards>;

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

export const Default: Story = {
  render: (args) => <PlayingFlipCards {...args} />,
  args: {
    cards: generateCards(5),
  },
};
