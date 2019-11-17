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
  profileMessageRed: {
    color: theme.palette.pink.dark,
    paddingTop: 15,
  },
  profileMessageGreen: {
    color: lightGreen[500],
    paddingTop: 15,
  },
  deleteIcon: {
    position: 'absolute',
    right: '15px',
    top: 'calc(50% - 15px)',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.pink.dark,
    }
  },
  helpOutlineIcon: {
    fontSize: 16
  },
  //
  dialogText: {
    marginTop: 10
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});

export default style;