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
});

export default theme;