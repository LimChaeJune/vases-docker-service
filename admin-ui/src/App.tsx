import React from 'react';
import { Button, ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })
const App = () => {
  console.log('tttbbb')
  return (
    <ChakraProvider theme={theme}><Button>test</Button></ChakraProvider>
  );
};

export default App;
