import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

class SnackbarComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      message: null,
      variant: '',
      wasChanged: false
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.message){
      const variant = nextProps.message === 'successful' ? 'success' : 'error';
      this.setState({message: nextProps.message, variant: variant, wasChanged: true})
    }
  }

  handleClose = () => this.setState({message: null, wasChanged: false, variant: ''});

  render() {
    const { classes } = this.props;
    const { variant, message, wasChanged } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={wasChanged}
        autoHideDuration={3500}
        onClose={this.handleClose}
        className={classes.snackbar}
      >

        <SnackbarContent
          className={classes[variant]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {variant === 'success' && <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)}/>}
              {variant === 'error' && <ErrorIcon className={classNames(classes.icon, classes.iconVariant)}/>}
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

export default withStyles(style, { withTheme: true })(SnackbarComponent);