const style = (theme) => ({
  container: {
    height: '100%',
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 360,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  button: {
    maxWidth: 300,
  },
  youNeedToSignIn: {
    textAlign: 'right',
    color: theme.palette.grey.light,
  },
});

export default style;