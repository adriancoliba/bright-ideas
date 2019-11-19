const style = (theme) => ({
  pinkDarkColor: {
    color: theme.palette.pink.dark,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#f0efef'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 80,
    height: 80,
  },
  buttonChange: {
    marginTop: theme.spacing(1),
    marginLeft: 4,
  },
  notSelectedAvatar: {
    cursor: 'pointer',
    opacity: 0.4,
  },
  selectedAvatar: {
    boxShadow: '0px 0px 10px 6px #6cafd4b5',
    border: '1px solid #73cdff',
  },
  dialogActions: {
    padding: theme.spacing(3),
    '& button': {
      marginRight: theme.spacing(2)
    }
  },
});

export default style;
