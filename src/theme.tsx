import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '#root, body, html': {
        width: '100%',
        height: '100%',
        // gray 50
        background: '#F7FAFC',
      },
      '.react-grid-item.react-grid-placeholder': {
        background: 'transparent',
        border: '2px dashed #A0AEC0',
        opacity: 0.2,
        borderRadius: '6px',
      },
    },
  },
});
