import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core";
import style from "./style";
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {myFirebase} from "../../utils/firebase";

class SignUpPage extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      registerMessage: '',
      openModal: false,
    };
  }

  handleChangeUser = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  };

  clearMessage = type => {
    if (type === 'register') { this.setState({registerMessage: false}) }
  };

  onSignUp = () => {
    if (this.state.user == null || this.state.user.firstName == null || this.state.user.lastName == null ||
      this.state.user.email == null || this.state.user.password == null) {
      return this.setState({registerMessage: 'Complete all fields.'})
    } else {
      const { firstName, lastName } = this.state.user;
      const fullName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
      const fullNameRegex = new RegExp ('^\\s*([A-Za-z]{1,}([\\.,] |[-\']| ))+[A-Za-z]+\\.?\\s*$');
      if (!fullNameRegex.test(fullName)){
        return this.setState({registerMessage: 'Your FirstName or LastName is badly formatted.'})
      } else {
        myFirebase
          .auth()
          .createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
          .then( u => {
            myFirebase.auth().currentUser.updateProfile({
              displayName: `${this.state.user.firstName} ${this.state.user.lastName}`,
            }).then( () => {
              this.setState({user: null})
            }).catch( error => {
              console.log(error)
            });
            this.setState({registerMessage: 'successful'})
          })
          .catch( error => {
            this.setState({registerMessage: error.message})
          });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerMessage === 'successful') {
      setTimeout(() => {this.setState({openModal: true})}, 1500)
    }
  }
  componentWillUnmount() {
    this.props.clearMessage('register');
  }

  handleCloseModal = () => { this.setState({openModal: false}) }

  render() {
    const { classes, user } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography variant="body2" className={classes.registerMessage}>
            {this.props.registerMessage && this.props.registerMessage} &nbsp;
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
                  onChange={this.props.handleChangeUser}
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
                  onChange={this.props.handleChangeUser}
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
                  onChange={this.props.handleChangeUser}
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
                  onChange={this.props.handleChangeUser}
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
                <Link to="/signin" variant="body2" className={classes.links}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
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
              <h2 id="transition-modal-title">Successfully signed up</h2>
              <br/><br/>
              <Link to="/signin">
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
  handleChangeUser: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default withStyles(style, { withTheme: true })(SignUpPage);