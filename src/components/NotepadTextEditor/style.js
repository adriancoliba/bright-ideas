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
    width: '10',
    height: '10'
  },
  textEditorContainer: {
    height: '100%',
    boxSizing: 'border-box'
  }
});

export default style;