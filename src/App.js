import React from 'react';
import {Provider} from 'react-redux';
import {Web3ReactProvider} from '@web3-react/core';
import {createMuiTheme} from '@material-ui/core/styles';
import RootRouter from './routes/RootRouter';
import { MuiThemeProvider } from '@material-ui/core/styles'
import store from './redux/store';
import getLibrary from './web3/getLibrary'

import colors from './styles/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#080808',
    },
    secondary: {
      main: '#fff9f8',
    }
  },
  spacing: 5,
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      h2: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      h3: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      h4: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      h5: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      h6: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      },
      subtitle1: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
      },
      subtitle2: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
      },
      caption: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em'
      }
    },
    MuiContainer: {
      maxWidthLg: {
        '@media (min-width: 1280px)': {
          maxWidth: '1146px'
        }
      }
    },
    MuiInputBase: {
      root: {
        color: colors.greyScale.darkest,
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.0068em',
        padding: '8px 20px',
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottomColor: colors.greyScale.common
        },
        '&:after': {
          borderBottomColor: colors.greyScale.common
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottomColor: colors.greyScale.common
        },
        '&.Mui-focused:after': {
          borderBottomColor: colors.secondary.green,
        },
        '&.Mui-focused > .MuiInputAdornment-root > .MuiSvgIcon-root': {
          color: colors.secondary.green
        }
      },
    }
  }
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
