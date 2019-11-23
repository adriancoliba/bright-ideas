const style = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: '#f0efef'
  },
  whiteBackground: {
    backgroundColor: '#f9f8f8'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
  },
  darkPinkColor: {
    color: theme.palette.pink.dark,
  },
  greenColor: {
    color: 'green'
  }
});

export default style;