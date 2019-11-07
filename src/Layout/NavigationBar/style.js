const style = (theme) => ({
  appBar: {
    height: 60,
    boxSizing: 'borderBox',
  },

  toolbarTitle: {
    marginRight: 20,
    marginLeft: -12,
    paddingLeft: 15,
    paddingRight: 10
  },

  toolbarLinks: {
    marginLeft: "auto",
    marginRight: -12,
    '& a': {
      textTransform: 'none',
      textDecoration: 'none',
      paddingLeft: 15,
      paddingRight: 10,
      color: 'black'
    }
  },
});

export default style;
