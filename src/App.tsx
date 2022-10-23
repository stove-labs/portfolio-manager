import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import log from 'loglevel';
import { theme } from './theme';
import { DependencyProvider } from './providers/DependencyProvider';
import { StoreProvider } from './store/useStore';
import { DispatchUniqueProvider } from './features/widgets/providers/DispatchUniqueProvider';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
// import { Dashboard } from './features/widgets/containers/Dashboard/Dashboard';
import { Playground } from './Playground';
import { StoreEvictProvider } from './store/providers/StoreEvictProvider';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <DependencyProvider>
      <StoreProvider>
        <StoreEvictProvider>
          <CSSReset />
          <ChakraProvider theme={theme}>
            <DispatchUniqueProvider>
              {/* <Dashboard /> */}
              <Playground />
            </DispatchUniqueProvider>
          </ChakraProvider>
        </StoreEvictProvider>
      </StoreProvider>
    </DependencyProvider>
  );
};
