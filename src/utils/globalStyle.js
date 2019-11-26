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
  }
});

export default globalStyle;