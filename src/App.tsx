import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { theme } from './theme';
import { DependencyProvider } from './providers/DependencyProvider';
import { StoreProvider } from './store/useStore';
import { Counter } from './features/Counter/containers/Counter/Counter';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <DependencyProvider>
        <ChakraProvider theme={theme}>
          <Counter />
        </ChakraProvider>
      </DependencyProvider>
    </StoreProvider>
  );
};
