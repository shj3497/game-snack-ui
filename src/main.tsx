import '@fontsource/pretendard/300.css';
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';
import './globals.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './router.tsx';
import ThemeProvider from './components/providers/ThemeProvider.tsx';
import QueryClientProvider from './components/providers/QueryClientProvider.tsx';
import {AdPopcornScript} from './components/_organisms/ad/ad-popcorn';
import {MezzoMediaScript} from './components/_organisms/ad/mezzo-media';
import {DawinScript} from './components/_organisms/ad/dawin';
import {GooglePublisherTagScript} from './components/_organisms/ad/google-publisher-tag';
import GTMProvider from './components/providers/GTMProvider';
import {CookiesProvider} from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <GTMProvider gtmId="GTM-5RHHPVH5">
        <AdPopcornScript />
        <MezzoMediaScript />
        <DawinScript />
        <GooglePublisherTagScript />
        <ThemeProvider>
          <QueryClientProvider>
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
          </QueryClientProvider>
        </ThemeProvider>
      </GTMProvider>
    </CookiesProvider>
  </StrictMode>,
);
