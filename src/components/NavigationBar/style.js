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
  button: {
    textTransform: 'none',
    textDecoration: 'none',
    padding: '1px 10px',
  }
});

export default style;
