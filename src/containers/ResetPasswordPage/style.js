import lightGreen from '@material-ui/core/colors/lightGreen';

const style = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    textTransform: 'none',
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  resetMessageRed: {
    color: theme.palette.pink.dark,
    paddingTop: 15,
  },
  resetMessageGreen: {
    color: lightGreen[500],
    paddingTop: 15,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: 500,
    maxHeight: 500,
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonSignIn: {
    textTransform: 'none',
    padding: '5px 20px',
    marginTop: 100,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
});

export default style;