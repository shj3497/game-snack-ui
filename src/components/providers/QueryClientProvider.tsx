import queryClient from '@/lib/service/query-client';
import {QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {FC, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}
const QueryClientProvider: FC<Props> = ({children}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
};
export default QueryClientProvider;
