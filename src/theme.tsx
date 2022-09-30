import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '#root, body, html': {
        width: '100%',
        height: '100%',
      },
    },
  },
});
