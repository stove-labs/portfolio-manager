import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { theme } from './theme';
import { DependencyProvider } from './providers/DependencyProvider';
import { StoreProvider } from './store/useStore';
import { Wallet } from './features/Wallet/containers/Wallet';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <DependencyProvider>
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <Wallet />
        </ChakraProvider>
      </StoreProvider>
    </DependencyProvider>
  );
};
