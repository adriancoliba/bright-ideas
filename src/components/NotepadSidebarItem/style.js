const style = (theme) => ({
  darkPink: {
    color: theme.palette.pink.dark,
  },
  listItem: {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey.dark,
  },
  textSection: {
    maxWidth: '85%',
    minWidth: '75%',
    color: theme.palette.primary.main,
  },
  colorTextSecondary: {
    color: 'white'
  },
  deleteIcon: {
    position: 'absolute',
    right: 15,
    top: 'calc(50% - 15px)',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.pink.dark,
    }
  },
  shareIcon: {
    position: 'absolute',
    right: 50,
    top: 'calc(50% - 15px)',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  helpOutlineIcon: {
    fontSize: 16
  },
  //
  dialogText: {
    marginTop: 10
  },
});

export default style;
