const style = (theme) => ({
  listItem: {
    cursor: 'pointer',
    backgroundColor: '#272727'
  },
  textSection: {
    maxWidth: '85%',
    minWidth: '75%',
    color: '#747474',
  },
  colorTextSecondary: {
    color: 'white'
  },
  deleteIcon: {
    position: 'absolute',
    right: '15px',
    top: 'calc(50% - 15px)',
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
