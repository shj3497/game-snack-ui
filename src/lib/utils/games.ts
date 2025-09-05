import CatchSecondIcon1x from '@/assets/main/catch-second@1x.webp';
import CatchSecondIcon2x from '@/assets/main/catch-second@2x.webp';
import CatchSecondIcon3x from '@/assets/main/catch-second@3x.webp';

import DrawSecondIcon1x from '@/assets/main/draw-second@1x.webp';
import DrawSecondIcon2x from '@/assets/main/draw-second@2x.webp';
import DrawSecondIcon3x from '@/assets/main/draw-second@3x.webp';

import FindSecondIcon1x from '@/assets/main/find-second@1x.webp';
import FindSecondIcon2x from '@/assets/main/find-second@2x.webp';
import FindSecondIcon3x from '@/assets/main/find-second@3x.webp';

import RouletteIcon1x from '@/assets/main/roulette@1x.webp';
import RouletteIcon2x from '@/assets/main/roulette@2x.webp';
import RouletteIcon3x from '@/assets/main/roulette@3x.webp';

import RpsRouletteIcon1x from '@/assets/main/rps-roulette@1x.webp';
import RpsRouletteIcon2x from '@/assets/main/rps-roulette@2x.webp';
import RpsRouletteIcon3x from '@/assets/main/rps-roulette@3x.webp';

import LadderIcon1x from '@/assets/main/ladder@1x.webp';
import LadderIcon2x from '@/assets/main/ladder@2x.webp';
import LadderIcon3x from '@/assets/main/ladder@3x.webp';
import {PictureProps} from '@/components/_atoms/Picture';
import {UserInfo} from '../store/user-info-config/type';

interface GameContent {
  title: string;
  description: string;
  link: string;
  icon: PictureProps['sources'];
  userInfo: Partial<UserInfo>;
}

const defaultUserInfo: Partial<UserInfo> = {
  userId: 'test-userId',
};

const games: GameContent[] = [
  {
    title: '미니게임: 시간잡기',
    description: '0.00초 스톱워치로 잡기',
    link: '/event/catch-second',
    icon: {
      srcSet: {
        '1x': CatchSecondIcon1x,
        '2x': CatchSecondIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: 'bc95b0e7bcf17b6fc6cb5159c3d48d7a',
    },
  },
  {
    title: '미니게임: 도형그리기',
    description: '제한시간 내 도형 따라그리기',
    link: '/event/draw-second',
    icon: {
      srcSet: {
        '1x': DrawSecondIcon1x,
        '2x': DrawSecondIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: '378266609c56defab444be35eecfd863',
    },
  },
  {
    title: '미니게임: 박스찾기',
    description: '제한시간 내 숫자박스 찾기',
    link: '/event/find-second',
    icon: {
      srcSet: {
        '1x': FindSecondIcon1x,
        '2x': FindSecondIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: '8623a8b2d2c70be8816c26d48236b509',
    },
  },
  {
    title: '랜덤게임: 룰렛돌리기',
    description: '랜덤 포인트 룰렛 돌리기',
    link: '/event/roulette',
    icon: {
      srcSet: {
        '1x': RouletteIcon1x,
        '2x': RouletteIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: '6e7f53d4f9baa5a0ebe048eb7b9cd92c',
    },
  },
  {
    title: '랜덤게임: 가위바위보',
    description: '가위바위보 이기고 포인트 받기',
    link: '/event/rps-roulette',
    icon: {
      srcSet: {
        '1x': RpsRouletteIcon1x,
        '2x': RpsRouletteIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: 'rps-roulette',
    },
  },
  {
    title: '랜덤게임: 사다리타기',
    description: '랜덤 포인트 사다리 타기',
    link: '/event/ladder',
    icon: {
      srcSet: {
        '1x': LadderIcon1x,
        '2x': LadderIcon2x,
      },
      type: 'image/webp',
    },
    userInfo: {
      ...defaultUserInfo,
      pid: 'ladder',
    },
  },
];

export default games;
