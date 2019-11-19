import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogContentText, Grid, withStyles, TextField,
  CircularProgress, CssBaseline, Button, Typography, Container, Box} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { showProfileMessage, updateProfile, deleteUser, clearMessage, changeAvatar } from '../../store/actions/profileActions';
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
      photoURL: {
        profileInfo: '',
        avatarId: ''
      }
    };
  }

  componentDidMount() {
    const { user } = this.props;
    user && user.displayName && this.setState({displayName: user.displayName})
    user && user.photoURL && this.setState({photoURL: user.photoURL})
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch } = this.props;
    nextProps.changedPassword && this.setState({passwordNew1: '', passwordNew2: ''});
    nextProps.profileMessage && setTimeout(() => dispatch(clearMessage()), 5);

    if(nextProps.newAvatarId){
      this.setState({photoURL: {
        ...this.state.photoURL,
        avatarId: nextProps.newAvatarId
      }})
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearMessage());
    this.setState({passwordNew1: '', passwordNew2: ''});
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, }
  )};

  handleChangeObject = event => {
    event.persist();
    this.setState(prevState => ({
      photoURL: {
        ...prevState.photoURL,
        [event.target.name]: event.target.value
      }
    })
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

      const propsProfileInfo = this.props.user.photoURL ? this.props.user.photoURL.profileInfo : '';
      const photoURL = (this.state.photoURL.profileInfo === propsProfileInfo) ? 'no' : this.state.photoURL;

      return dispatch(updateProfile(name, photoURL, password))
    }
  };

  onDeleteUser = () => {
    const { dispatch } = this.props;
    dispatch(deleteUser());
  };

  changeAvatar = (avatarId) => {
    const { dispatch } = this.props;
    dispatch(changeAvatar(avatarId, this.state.photoURL));
  };

  render() {
    const { classes, profileMessage } = this.props;

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <AvatarUser changeAvatar={this.changeAvatar}
                        avatarId={this.state.photoURL.avatarId ? this.state.photoURL.avatarId : ''}
            />
            <Box m={2}/>
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
                    margin="normal"
                    disabled
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.props.user ? this.props.user.email : 'null'}
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Box m={2}/>
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
                <Box m={2}/>
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
                    value={this.state.photoURL.profileInfo ? this.state.photoURL.profileInfo : ''}
                    onChange={this.handleChangeObject}
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
              <Button color="secondary" onClick={this.onDeleteUser}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar message={this.props.profileMessage}/>
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
    newAvatarId: state.profile.newAvatarId,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ProfilePage));