import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../src/styles/theme'

export const decorators = [
  (story) => (
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}