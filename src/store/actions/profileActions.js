import { myFirebase } from "../../utils/firebase";
import { SET_PROFILE_MESSAGE, UPDATE_PROFILE_SUCCESS, START_LOADING,
  CLEAR_PROFILE_MESSAGE, CHANGE_AVATAR_SUCCESS} from "../constants/profileConstants";
import { setUserDeAuthenticated } from './authActions';
import { push } from 'connected-react-router';

export const updateProfile = (displayName, photoURL, password) => dispatch => {
  dispatch(startLoading());

  if(displayName !== 'no'){
    myFirebase.auth().currentUser
      .updateProfile({displayName: displayName})
      .then(() => {
        return (password === 'no' || photoURL === 'no') ? dispatch(showProfileMessage(null, 'successful')) : null
      })
      .catch( error => dispatch(showProfileMessage(error, null)))
  }

  if(photoURL !== 'no'){
    myFirebase.auth().currentUser
      .updateProfile({ photoURL: JSON.stringify(photoURL) })
      .then(() => {
        return (password === 'no') ? dispatch(showProfileMessage(null, 'successful')) : null
      })
      .catch( error => dispatch(showProfileMessage(error, null)))
  }

  if(password !== 'no'){
    myFirebase.auth().currentUser.updatePassword(password)
      .then(() => {
        return dispatch(showProfileMessage(null, 'successful/password'))
      })
      .catch( error => dispatch(showProfileMessage(error, null)))
  }
};

export const updateProfileSuccess = () => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
  }
};

export const showProfileMessage = (error, customError) => {
  return {
    type: SET_PROFILE_MESSAGE,
    error,
    customError
  }
};

export const deleteUser = () => dispatch => {
  const user = myFirebase.auth().currentUser;
  user.delete()
    .then(() => {
      dispatch(setUserDeAuthenticated());
      setTimeout(() => {
        dispatch(push('/'));
        window.location.reload()
      }, 1500)
  }).catch(error => {
    console.log('error', error)
  });
};

export const changeAvatar = (avatarId, photoURL) => dispatch => {
  const newPhotoURL = JSON.parse(JSON.stringify(photoURL));
  newPhotoURL.avatarId = avatarId;

  myFirebase.auth().currentUser
    .updateProfile({ photoURL: JSON.stringify(newPhotoURL) })
    .then(() => {
      return dispatch(changeAvatarSuccess(newPhotoURL))
    })
    .catch( error => dispatch(showProfileMessage(error, null)))
};

export const changeAvatarSuccess = (newPhotoURL) => {
  return {
    type: CHANGE_AVATAR_SUCCESS,
    newPhotoURL
  }
};

export const clearMessage = () => {
  return {
    type: CLEAR_PROFILE_MESSAGE,
  }
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
};