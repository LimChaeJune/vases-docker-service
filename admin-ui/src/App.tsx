import React, { useState } from 'react';
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { BlueprintProvider } from '@blueprintjs/core';
import { useViewFlow } from 'x-view-model';
import { LoginVM } from '~/vms/LoginVM';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '~/router';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
// include blueprint-icons.css for icon font support
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: 'hsla(9, 100%, 58%, 1)',
    },
  },
});
const App = () => {
  const [[current, flow], [state, send]] = useViewFlow(LoginVM, []);

  const [signup, setSignup] = useState(false);

  return (
    <BlueprintProvider>
      <div className="bp3-dark">
        <ChakraProvider
          theme={theme}
          toastOptions={{ defaultOptions: { position: 'top' } }}
        >
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </ChakraProvider>
      </div>
    </BlueprintProvider>
  );
};

export default App;
