import React, {Component} from 'react';
import { myFirebase } from '../../utils/firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import style from "./style";
import { TextField, CircularProgress, CssBaseline, Button, Avatar,
  Typography, Container, Modal, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Backdrop from '@material-ui/core/Backdrop';
import * as ROUTES from "../../constants/routes";
import {showResetMessage, resetPasswordUser} from '../../store/actions/authActions';

class ResetPassword extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      openModal: false,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPasswordMessage === 'successful') {
      setTimeout(() => {this.setState({openModal: true, email: null})}, 300)
    }
  }

  handleChangeEmail = event => {
    this.setState({email: event.target.value})
  };

  handleCloseModal = () => { this.setState({openModal: false}) }

  onResetPassword = () => {
    const { dispatch } = this.props;
    if (this.state.email === ''){
      return dispatch(showResetMessage(null, 'Complete your email'));
    } else {
      // this.setState({loading: true});
      dispatch(resetPasswordUser(this.state.email));
    }
  };

  render() {
    const { classes, resetPasswordMessage } = this.props;
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Typography variant="body2" className={this.props.resetPasswordMessage === 'successful' ? classes.resetMessageGreen : classes.resetMessageRed}>
              {resetPasswordMessage && resetPasswordMessage} &nbsp;
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChangeEmail}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onResetPassword}
              >
                Reset my password
              </Button>
            </form>
            {this.props.loading && <CircularProgress/>}
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.openModal}>
              <div className={classes.paperModal}>
                <Avatar className={classes.avatar}>
                  <CheckCircleOutlineIcon />
                </Avatar>
                <h2 id="transition-modal-title">Password reset successful. A message will be sent to that address
                  containing a link to reset your password.</h2>
                <br/><br/>
                <Link to={ROUTES.SIGN_IN}>
                  <Button variant={'outlined'} className={classes.buttonSignIn}>Sign In</Button>
                </Link>
              </div>
            </Fade>
          </Modal>
        </Container>
    );
  }
}

ResetPassword.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    resetPasswordMessage: state.auth.resetPasswordMessage,
    loading: state.auth.loading
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(ResetPassword));