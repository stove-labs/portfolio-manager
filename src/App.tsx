import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { Provider } from 'react-redux';
import { Counter } from './features/Counter/containers/Counter/Counter';
import { theme } from './theme';
import { store } from './store/store';

log.setDefaultLevel('DEBUG');

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Counter />
      </ChakraProvider>
    </Provider>
  );
};
