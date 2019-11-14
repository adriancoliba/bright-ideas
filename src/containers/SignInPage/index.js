import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core";
import style from "./style";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {authListener, signInUser} from "../../store/actions/authActions";
import * as ROUTES from "../../constants/routes";

class SignInPage extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.isUserAuthenticated && dispatch(authListener)
  }
  componentWillUnmount() {
    this.setState({user: null})
  }

  onSignIn = () => {
    const { dispatch } = this.props;
    if (this.state.user == null || this.state.user.email == null || this.state.user.password == null) {
      return this.setState({loginMessage: 'Complete all fields.'})
    } else {
      dispatch(signInUser(this.state.user))
    }
  };

  handleChangeUser = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  };

  render() {
    const { classes } = this.props;
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography variant="body2" className={classes.loginMessage}>
              {this.props.loginMessage && this.props.loginMessage} &nbsp;
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
                onChange={this.handleChangeUser}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangeUser}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSignIn}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={ROUTES.RESET_PASSWORD} variant="body2" className={classes.links}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={ROUTES.SIGN_UP} variant="body2" className={classes.links}>Don't have an account?</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
  }
}

SignInPage.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  loginMessage: PropTypes.string,
  user: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    loginMessage: state.auth.loginMessage,
    user: state.auth.user,
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(SignInPage));