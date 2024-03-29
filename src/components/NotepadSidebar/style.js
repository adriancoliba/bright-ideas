const style = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },

  newChatBtn: {
    borderRadius: '0px'
  },

  sidebarContainer: {
    marginTop: '0px',
    width: '300px',
    height: '100%',
    boxSizing: 'border-box',
    float: 'left',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.grey.main,
  },

  newNoteBtn: {
    width: '100%',
    height: '50px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    backgroundColor: theme.palette.grey.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.grey.light,
    }
  },

  newNoteInput: {
    width: '100%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)'
    }
  },

  newNoteSubmitBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0px',
    color: theme.palette.grey.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  },

  listNotesSidebar: {
    paddingTop: 0
  },
});

export default style;
