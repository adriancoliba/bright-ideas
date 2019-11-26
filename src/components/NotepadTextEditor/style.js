const style = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  titleInput: {
    height: '50px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 300px)',
    backgroundColor: theme.palette.grey.dark,
    color: 'white',
    paddingLeft: '50px'
  },
  editIcon: {
    position: 'absolute',
    left: '310px',
    top: '72px',
    color: theme.palette.primary.main,
    width: 26,
    height: 26,
    opacity: 0,
    animation: '$opacityOn 3s infinite forwards',
    animationDelay: '2s',
  },
  shareIcon: {
    position: 'absolute',
    fontSize: 60,
    right: 30,
    top: 'calc(100vh - 90px)',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer'
    }
  },
  textEditorContainer: {
    height: '100%',
    boxSizing: 'border-box'
  },
  '@keyframes opacityOn': {
    '0%': {
    opacity: 0.5,
    },
    '25%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  }
});

export default style;