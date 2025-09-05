import React from 'react';
import type {Preview} from '@storybook/react';
import ThemeProvider from '../src/components/providers/ThemeProvider';
import {MemoryRouter} from 'react-router-dom';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

import '@fontsource/pretendard/300.css';
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';

import '../src/globals.css';

// 1) MUI 테마 감싸기
const withMuiTheme = (Story: any, context: any) => (
  <ThemeProvider>
    <Story {...context} />
  </ThemeProvider>
);

const withRouterDecorator = (Story: any, context: any) => (
  <MemoryRouter initialEntries={['/']}>
    <Story {...context} />
  </MemoryRouter>
);

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    reactRouter: {
      routePath: '/',
      browserPath: '/',
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
  decorators: [withMuiTheme, withRouterDecorator],
};

export default preview;
