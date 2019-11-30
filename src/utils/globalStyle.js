const globalStyle = (theme) => ({
  textDecorationNone: {
    textDecoration: 'none',
  },
  textTransformNone: {
    textTransform: 'none',
  },
  decorationTransformNone: {
    textDecoration: 'none',
    textTransform: 'none',
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.main
    },
    fontSize: 16
  },
  colorPrimaryDark: {
    color: theme.palette.primary.dark
  },
  postBodyParsed: {
    '& p, h2, h1': {
      marginTop: 5,
      marginBottom: 5
    },
  },
});

export default globalStyle;