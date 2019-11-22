const style = (theme) => ({
  pinkDarkColor: {
    color: theme.palette.pink.dark,
  },
  primaryDarkColor: {
    color: theme.palette.primary.dark,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: '#f0efef'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
  },
  readMoreButton: {
    marginTop: -10,
    padding: '5px 9px'
  },
  buttonNoTransform: {
    textTransform: 'none',
    textDecoration: 'none',
  },
});

export default style;
