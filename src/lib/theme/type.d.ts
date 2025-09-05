import {CSSProperties} from 'react';
import '@mui/material/styles';
import {SimplePaletteColorOptions as OriginSimplePaletteColorOptions} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomCSSProperties extends CSSProperties {
    [key: string]: CSSProperties | string | number | undefined;
  }

  interface Palette {
    game_green: Palette['primary'];
    game_yellow: Palette['primary'];
    game_pink: Palette['primary'];
    game_mint: Palette['primary'];
    game_white: Palette['primary'];
  }
  interface PaletteOptions {
    game_green?: PaletteOptions['primary'];
    game_yellow?: PaletteOptions['primary'];
    game_pink?: PaletteOptions['primary'];
    game_mint?: PaletteOptions['primary'];
    game_white?: PaletteOptions['primary'];
  }

  interface SimplePaletteColorOptions extends OriginSimplePaletteColorOptions {
    loading?: string;
  }
}
