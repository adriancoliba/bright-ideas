const style = (theme) => ({
  listItem: {
    cursor: 'pointer',
    backgroundColor: '#272727'
  },
  textSection: {
    maxWidth: '85%',
    minWidth: '75%',
    color: '#FBC601',
  },
  colorTextSecondary: {
    color: 'white'
  },
  deleteIcon: {
    position: 'absolute',
    right: '15px',
    top: 'calc(50% - 15px)',
    color: '#9ABED2',
    '&:hover': {
      color: '#d64161'
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
