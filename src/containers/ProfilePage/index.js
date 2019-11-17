import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogContentText, Grid, withStyles} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { TextField, CircularProgress, CssBaseline, Button, Avatar,
  Typography, Container } from '@material-ui/core';
import { showProfileMessage, updateProfile, clearMessage } from '../../store/actions/profileActions';
import HelpOutlineIcon from "@material-ui/core/SvgIcon/SvgIcon";

class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      displayName: '',
      passwordNew1: '',
      passwordNew2: '',
      openDeleteDialog: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    user && user.displayName && this.setState({displayName: user.displayName})
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch } = this.props;
    nextProps.changedPassword && this.setState({passwordNew1: '', passwordNew2: ''})
    nextProps.profileMessage === 'successful' && setTimeout(() => dispatch(clearMessage()), 2500)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, }
  )};

  handleCloseModal = () => { this.setState({openDeleteDialog: false}) };

  onUpdateProfile = () => {
    const { dispatch } = this.props;
    if (this.state.displayName === '') {
      return dispatch(showProfileMessage(null, 'Complete your Full Name.'))
    } else {
      const displayNameRegex = new RegExp ('^\\s*([A-Za-z]{1,}([\\.,] |[-\']| ))+[A-Za-z]+\\.?\\s*$');
      if (!displayNameRegex.test(this.state.displayName)){
        return dispatch(showProfileMessage(null, 'Your Full Name is badly formatted.'))
      } else if (this.state.passwordNew1 !== this.state.passwordNew2){
        return dispatch(showProfileMessage(null, 'Passwords don\'t match'))
      }
      const name = (this.state.displayName === this.props.user.displayName) ? 'no' : this.state.displayName;
      const password = (this.state.passwordNew1.length < 2) ? 'no' : this.state.passwordNew1;
      return dispatch(updateProfile(name, password))
    }
  };

  render() {
    const { classes, profileMessage } = this.props;

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBoxRoundedIcon />
            </Avatar>
            <Typography variant="body2" className={this.props.profileMessage === 'successful' ? classes.profileMessageGreen : classes.profileMessageRed}>
              {profileMessage && profileMessage} &nbsp;
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="fname"
                    name="displayName"
                    variant="outlined"
                    required
                    fullWidth
                    id="displayName"
                    label="Full Name"
                    autoFocus
                    value={this.state.displayName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordNew1"
                    label="New password"
                    type="password"
                    id="passwordNew1"
                    autoComplete="current-password"
                    value={ this.state.passwordNew1 ? this.state.passwordNew1 : ''}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordNew2"
                    label="Repeat password"
                    type="password"
                    id="passwordNew2"
                    autoComplete="current-password"
                    value={ this.state.passwordNew2 ? this.state.passwordNew2 : ''}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onUpdateProfile}
              >
                Update my Profile
              </Button>
            </form>
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
                <Typography onClick={() => {this.setState({openDeleteDialog: true})}}
                            variant="body2" className={classNames(classes.profileMessageRed, classes.cursorPointer)}
                > Delete account
                </Typography>
              </Grid>
            </Grid>
            {this.props.loading && <CircularProgress/>}
          </div>
          <Dialog
            open={this.state.openDeleteDialog}
            onClose={this.handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
                This account will be permanently deleted, are you sure
                <HelpOutlineIcon
                  className={classes.helpOutlineIcon}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseModal} className={classes.darkPink} autoFocus>
                No
              </Button>
              <Button color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
    );
  }
}

ProfilePage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    user: state.auth.user,
    profileMessage: state.profile.profileMessage,
    changedPassword: state.profile.changedPassword,
    loading: state.profile.loading,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ProfilePage));