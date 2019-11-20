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
  },
  badge: {
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '10%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: `1px solid ${theme.palette.primary.main}`,
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.7)',
      opacity: 0,
    },
  },
});

export default style;
