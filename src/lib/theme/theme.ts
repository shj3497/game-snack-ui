import {alpha, createTheme} from '@mui/material';

const greenBase = '#00FFBC';
const yellowBase = '#FFF600';
const pinkBase = '#FF5DCC';
const mintBase = '#00FCFF';
const whiteBase = '#FFFFFF';

let theme = createTheme();

theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, sans-serif',
  },
  palette: {
    game_green: theme.palette.augmentColor({
      name: 'green',
      color: {
        main: greenBase,
        light: alpha(greenBase, 0.25),
        loading: '#A8D5BA',
      },
    }),
    game_yellow: theme.palette.augmentColor({
      name: 'yellow',
      color: {
        main: yellowBase,
        light: alpha(yellowBase, 0.25),
        loading: '#FFF9C4',
      },
    }),
    game_pink: theme.palette.augmentColor({
      name: 'pink',
      color: {
        main: pinkBase,
        light: alpha(pinkBase, 0.25),
        loading: '#F8CCE6',
      },
    }),
    game_mint: theme.palette.augmentColor({
      name: 'mint',
      color: {
        main: mintBase,
        light: alpha(mintBase, 0.25),
        loading: '#C7F0E9',
      },
    }),
    game_white: theme.palette.augmentColor({
      color: {
        main: whiteBase,
        light: alpha(whiteBase, 0),
      },
      name: 'white',
    }),
  },
});

export {theme};
