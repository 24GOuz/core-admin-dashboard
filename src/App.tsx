import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/query-client/query-client';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
