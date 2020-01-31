import React from 'react';
import {Provider} from 'react-redux';
import {Web3ReactProvider} from '@web3-react/core';
import {createMuiTheme} from '@material-ui/core/styles';
import RootRouter from './routes/RootRouter';
import { MuiThemeProvider } from '@material-ui/core/styles'
import store from './redux/store';
import getLibrary from './web3/getLibrary'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#080808',
        },
        secondary: {
            main: '#fff9f8',
        }
    },
    spacing: 5
});

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <RootRouter/>
                </MuiThemeProvider>
            </Provider>
        </Web3ReactProvider>
    );
}

export default App;
