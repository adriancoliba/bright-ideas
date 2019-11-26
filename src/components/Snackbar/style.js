import { green } from '@material-ui/core/colors';

const style = (theme) => ({
  snackbar: {
    marginTop: 48
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.pink.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default style;
