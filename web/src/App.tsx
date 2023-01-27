import React from 'react';
import MainPage from './views/Main/MainPage';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = (): JSX.Element => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
