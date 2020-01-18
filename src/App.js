import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';

import Routes from './Routes';

import { store, history } from './store';
import getLibrary from './web3/getLibrary'
function App() {
  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </Web3ReactProvider>
  );
}

export default App;
