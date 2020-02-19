import React from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {Web3ReactProvider} from '@web3-react/core';
import {createMuiTheme} from '@material-ui/core/styles';
import RootRouter from './routes/RootRouter';
import { MuiThemeProvider } from '@material-ui/core/styles'
import  store, { persistor } from './redux/store';
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
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      h4: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      h5: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      h6: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      subtitle1: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      subtitle2: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      },
      caption: {
        fontFamily: 'Inter',
        letterSpacing: '-0.0068em',
        lineHeight: 1.2,
      }
    },
    MuiContainer: {
      maxWidthLg: {
        '@media (min-width: 1280px)': {
          maxWidth: '1146px'
        },
        '@media (max-width: 960px)': {
          padding: '0 20px'
        }
      },
      maxWidthSm: {
        '@media (min-width: 600px)': {
          maxWidth: '640px',
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
      },
      input: {
        color: colors.greyScale.darkest,
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.0068em',
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
        },
        '&.Mui-focused > .MuiSvgIcon-root': {
          color: colors.secondary.green
        }
      },
    },
    label: {
      '+ .MuiInput-formControl': {
        marginTop: '10px'
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: colors.greyScale.inputBg,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        padding: '0',
        '&:hover': {
          backgroundColor: colors.greyScale.lightest
        },
        '&.Mui-focused': {
          backgroundColor: colors.greyScale.inputBg
        }
      },
      input: {
        padding: '27px 20px 10px'
      },
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
    },
    MuiFormLabel: {
      root: {
        '&.Mui-focused': {
          color: colors.secondary.green
        }
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'Inter',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.0068em',
        color: colors.greyScale.common,
      }
    },
    MuiInputLabel: {
      root: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: '-0.0068em',
        color: colors.greyScale.common
      },
      filled: {
        fontWeight: 400,
        color: colors.greyScale.common,
        '&.MuiInputLabel-shrink': {
          transform: 'translate(20px, 10px) scale(0.75)'
        }
      },
      shrink: {
        transform: 'translate(20px, 1.5px) scale(0.75)',
      }
    },
    MuiStepper: {
      root: {
        paddingLeft: '0',
        paddingRight: '0',
        marginLeft: '-7px'
      },
    },
    MuiStep: {
      horizontal: {
        paddingRight: '0'
      }
    },
    MuiStepLabel: {
      root: {
        position: 'relative',
        alignItems: 'flex-end',
      },
      label: {
        fontSize: '14px',
        textAlign: 'start',
        fontWeight: 500,
        color: colors.greyScale.dark,
        padding: '30px 12px 12px 12px',
        borderRadius: '8px',
        backgroundColor: colors.greyScale.lighter,
        '&.MuiStepLabel-alternativeLabel': {
          fontSize: '14px',
          textAlign: 'start',
          fontWeight: 500,
          color: colors.greyScale.dark,
          marginTop: '0'
        },
        '&.MuiStepLabel-active': {
          color: colors.primary.white
        },
        '&.MuiStepLabel-completed': {
          color: colors.primary.white
        },
      },
      iconContainer: {
        position: 'absolute',
        top: '14px',
        right: '14px'
      },
      active: {
        backgroundImage: colors.gradients.greenDeg,
        boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)'
      },
      completed: {
        backgroundColor: colors.secondary.green,
        color: colors.primary.white
      }
    },
    MuiTab: {
      root: {
        fontFamily: 'Inter',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: 1.3,
        textTransform: 'none',
        letterSpacing: '-0.0068em',
        padding: 'unset',
        marginRight: '20px'
      },
      textColorPrimary: {
        color: colors.greyScale.common,
        '&.Mui-selected': {
          color: colors.secondary.peach
        }
      }
    },
    PrivateTabIndicator: {
      colorPrimary: {
        backgroundColor: colors.secondary.peach
      }
    },
    PrivateRadioButtonIcon: {
      root: {
        color: colors.greyScale.common
      },
      checked: {
        color: colors.secondary.cyan
      }
    }
  }
});

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <RootRouter/>
          </PersistGate>
        </MuiThemeProvider>
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
