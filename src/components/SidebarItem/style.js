const style = (theme) => ({
  listItem: {
    cursor: 'pointer'
  },
  textSection: {
    maxWidth: '85%',
    minWidth: '75%',
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
