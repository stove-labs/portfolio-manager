import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { theme } from './theme';
import { DependencyProvider } from './providers/DependencyProvider';
import { StoreProvider } from './store/useStore';
import { DispatchUniqueProvider } from './features/widgets/providers/DispatchUniqueProvider';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import { WidgetsLayout } from './features/widgets/containers/WidgetsLayout/WidgetsLayout';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <DependencyProvider>
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <DispatchUniqueProvider>
            <WidgetsLayout />
          </DispatchUniqueProvider>
        </ChakraProvider>
      </StoreProvider>
    </DependencyProvider>
  );
};
