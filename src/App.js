import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootRouter from './routes/RootRouter';
import { MuiThemeProvider } from '@material-ui/core/styles'
import  store, { persistor } from './redux/store';
import {theme} from './styles/theme'

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <RootRouter/>
        </PersistGate>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
