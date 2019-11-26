import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { TextField, CircularProgress, CssBaseline, Button, Avatar,
  Typography, Container, Grid, Checkbox, FormControlLabel, Backdrop, Modal, Fade } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from "@material-ui/core";
import style from "./style";
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { showSignUpMessage, signUpUser } from '../../store/actions/authActions';
import * as ROUTES from "../../constants/routes";
import globalStyle from "../../utils/globalStyle";

class SignUpPage extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      openModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerMessage === 'successful') {
      setTimeout(() => {this.setState({openModal: true, user: null})}, 500)
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(showSignUpMessage(null, ''))
    this.setState({user: null})
  }

  handleChangeUser = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value.trim()
      }
    })
  };

  onSignUp = () => {
    const { dispatch } = this.props;
    if (this.state.user == null || this.state.user.firstName == null || this.state.user.lastName == null ||
      this.state.user.email == null || this.state.user.password == null) {
      return dispatch(showSignUpMessage(null, 'Complete all fields.'))
    } else {
      const { firstName, lastName } = this.state.user;
      const fullName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
      const fullNameRegex = new RegExp ('^\\s*([A-Za-z]{1,}([\\.,] |[-\']| ))+[A-Za-z]+\\.?\\s*$');
      if (!fullNameRegex.test(fullName)){
        return dispatch(showSignUpMessage(null, 'Your FirstName or LastName is badly formatted.'))
      } else {
        dispatch(signUpUser(this.state.user))
      }
    }
  };

  handleCloseModal = () => { this.setState({openModal: false}) }

  render() {
    const { classes, registerMessage } = this.props;
    const { user } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h2">
            Sign up
          </Typography>
          <Typography variant="h3" className={registerMessage === 'successful' ? classes.registerMessageGreen : classes.registerMessageRed}>
            {registerMessage && registerMessage} &nbsp;
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={ (user && user.firstName) ? user.firstName : ''}
                  onChange={this.handleChangeUser}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="name"
                  value={ (user && user.lastName) ? user.lastName : ''}
                  onChange={this.handleChangeUser}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={ (user && user.email) ? user.email : ''}
                  onChange={this.handleChangeUser}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={ (user && user.password) ? user.password : ''}
                  onChange={this.handleChangeUser}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSignUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="h3" className={classes.decorationTransformNone}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
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
              <br/>
              <Typography variant="h2" id="transition-modal-title">Successfully signed up</Typography>
              <br/><br/>
              <Link to={ROUTES.SIGN_IN} className={classes.textDecorationNone}>
                <Button variant={'outlined'} className={classes.buttonSignIn}>Sign In</Button>
              </Link>
            </div>
          </Fade>
        </Modal>

      </Container>
    );
  }
}

SignUpPage.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    registerMessage: state.auth.registerMessage,
    loading: state.auth.loading,
  };
};

export default withStyles((theme) => ({
  ...style(theme),
  ...globalStyle(theme),
}), { withTheme: true })(connect(mapStateToProps)(SignUpPage));