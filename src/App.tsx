import { ChakraProvider } from '@chakra-ui/react';
import log from 'loglevel';
import { Hello } from './components/Hello/Hello';
import { theme } from './theme';

log.setDefaultLevel('DEBUG');

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Hello name={'World'} />;
    </ChakraProvider>
  );
};
