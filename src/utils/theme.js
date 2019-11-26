import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FBC601',
      main: '#FBC601',
      dark: '#cba001' },
    secondary: {
      light: '#9ABED2',
      main: '#9ABED2',
      dark: '#587381'
    },
    grey: {
      light: '#626262',
      main: '#404040',
      dark: '#272727'
    },
    pink: {
      dark: '#d64161',
    },
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: 1.2
    },
    h2: {
      fontSize: 28,
      fontWeight: 300,
      lineHeight: 1.1,
      letterSpacing: 0.7
    },
    h3: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: 0.5
    },
    h4: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: 0.5
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: 0.5
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: 0.5
    },
  },

  overrides: {
    MuiButton: {
      text: {
        fontSize: 16,
      },
      root: {
        fontSize: 16,
      }
    },
    MuiInputBase: {
      root: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'text',
        display: 'inline-flex',
        fontSize: 18,
        boxSizing: 'border-box',
        alignItems: 'center',
        lineHeight: 1.3,
      },
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          fontSize: 20,
        },
      }
    },
  },
});

export default theme;