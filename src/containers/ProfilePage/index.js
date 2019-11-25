import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogContentText, Grid, withStyles, TextField,
  CircularProgress, CssBaseline, Button, Typography, Container, Box} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { showProfileMessage, updateProfile, deleteUser, clearMessage, updateProfilePassword } from '../../store/actions/profileActions';
import {getUserAll, updateUserToUsers} from '../../store/actions/authActions';
import HelpOutlineIcon from "@material-ui/core/SvgIcon/SvgIcon";
import AvatarUser from '../../components/AvatarUser';
import Snackbar from '../../components/Snackbar';

class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      displayName: '',
      passwordNew1: '',
      passwordNew2: '',
      openDeleteDialog: false,
      profileInfo: '',
      avatarId: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserAll(localStorage.getItem('uid')))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch } = this.props;
    nextProps.changedPassword && this.setState({passwordNew1: '', passwordNew2: ''});
    nextProps.profileMessage && setTimeout(() => dispatch(clearMessage()), 5);
    nextProps.newAvatarId && this.setState({avatarId: nextProps.newAvatarId});
    nextProps.userAll !== this.props.userAll && this.setState({
      avatarId: nextProps.userAll.avatarId,
      profileInfo: nextProps.userAll.profileInfo,
      displayName: nextProps.userAll.displayName,
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearMessage());
    this.setState({passwordNew1: '', passwordNew2: ''});
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value.trim() }
  )};

  handleCloseModal = () => { this.setState({openDeleteDialog: false}) };

  onUpdateProfile = () => {
    const { dispatch, userAll } = this.props;

    if (this.state.displayName === '') {
      return dispatch(showProfileMessage(null, 'Complete your Full Name.'))
    } else {
      const displayNameRegex = new RegExp ('^\\s*([A-Za-z]{1,}([\\.,] |[-\']| ))+[A-Za-z]+\\.?\\s*$');
      if(!displayNameRegex.test(this.state.displayName)){
        return dispatch(showProfileMessage(null, 'Your Full Name is badly formatted.'))
      }
      const displayName = (this.state.displayName === userAll.displayName) ? 'no' : this.state.displayName;

      const propsProfileInfo = userAll.profileInfo ? userAll.profileInfo : '';
      const profileInfo = (this.state.profileInfo === propsProfileInfo) ? 'no' : this.state.profileInfo;

      return dispatch(updateProfile(userAll.id, displayName, profileInfo ))
    }
  };

  onUpdateProfilePassword = () => {
    const { dispatch } = this.props;
    if (this.state.passwordNew1 !== this.state.passwordNew2){
      return dispatch(showProfileMessage(null, 'Passwords don\'t match'))
    }
    return dispatch(updateProfilePassword(this.state.passwordNew1))
  };

  onDeleteUser = () => {
    const { dispatch, userAll } = this.props;
    dispatch(deleteUser(userAll.uid, userAll.id));
  };

  changeAvatar = (avatarId) => {
    const { dispatch, userAll } = this.props;
    dispatch(updateUserToUsers(userAll.id, 'no', 'no', avatarId))
  };

  render() {
    const { classes, profileMessage } = this.props;
    if(this.props.userAll) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <AvatarUser changeAvatar={this.changeAvatar}
                        avatarId={this.state.avatarId ? this.state.avatarId : ''}
            />
            <Box m={2}/>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.props.user ? this.props.user.email : ''}
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
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
                    value={this.state.displayName ? this.state.displayName : ''}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Profile Info"
                    fullWidth
                    multiline
                    rows="6"
                    name="profileInfo"
                    margin="normal"
                    variant="outlined"
                    value={this.state.profileInfo ? this.state.profileInfo : ''}
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
            <Box m={2}/>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} m={5}>
                  <TextField
                    variant="outlined"
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
                onClick={this.onUpdateProfilePassword}
              >
                Update my Password
              </Button>
            </form>

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
              <Button color="secondary" onClick={this.onDeleteUser}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar message={profileMessage}/>
        </Container>
      )
    } else {
      return(<div>&nbsp;</div>);
    }
  }
}

ProfilePage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    user: state.auth.user,
    userAll: state.auth.userAll,
    userAllInitialized: state.auth.userAllInitialized,
    profileMessage: state.profile.profileMessage,
    changedPassword: state.profile.changedPassword,
    loading: state.profile.loading,
    newAvatarId: state.profile.newAvatarId,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ProfilePage));