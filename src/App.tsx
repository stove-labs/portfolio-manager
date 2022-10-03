import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { theme } from './theme';
import { DependencyProvider } from './providers/DependencyProvider';
import { StoreProvider } from './store/useStore';
import { WidgetRenderer } from './features/widgets/containers/WidgetRenderer/WidgetRenderer';
import { DispatchUniqueProvider } from './features/widgets/providers/DispatchUniqueProvider';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <DependencyProvider>
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <DispatchUniqueProvider>
            <WidgetRenderer />
          </DispatchUniqueProvider>
        </ChakraProvider>
      </StoreProvider>
    </DependencyProvider>
  );
};
