import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/query-client/query-client';
import { theme } from './shared/theme/theme';
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Router />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
