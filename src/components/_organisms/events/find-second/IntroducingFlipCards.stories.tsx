import {Meta, StoryObj} from '@storybook/react';
import IntroducingFlipCards from './IntroducingFlipCards';
import {CardItem} from './FindBoxSection';

const meta: Meta<typeof IntroducingFlipCards> = {
  title: 'Event/find-second/IntroducingFlipCards',
  component: IntroducingFlipCards,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof IntroducingFlipCards>;

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
  render: (args) => <IntroducingFlipCards {...args} />,
  args: {
    cards: generateCards(5),
    isFlip: false,
  },
};

export const Flip: Story = {
  render: (args) => <IntroducingFlipCards {...args} />,
  args: {
    cards: generateCards(5),
    isFlip: true,
  },
};
