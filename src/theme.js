import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        CloseButton: {
          colors: {
            red: 'red',
          },
        },
      },
});

export default theme;
