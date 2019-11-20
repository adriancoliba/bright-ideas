import { myFirebase } from "../../utils/firebase";
import { SET_PROFILE_MESSAGE, START_LOADING,
  CLEAR_PROFILE_MESSAGE, UPDATE_USER_TO_USERS_SUCCESS, } from "../constants/profileConstants";
import { setUserDeAuthenticated, updateUserToUsers, getUserAll} from './authActions';
import { push } from 'connected-react-router';

export const updateProfile = (userAllId, displayName, profileInfo) => dispatch => {
  dispatch(startLoading());
  dispatch(updateUserToUsers(userAllId, displayName, profileInfo, 'no'))
};

export const updateProfilePassword = (password) => dispatch => {
  dispatch(startLoading());

  myFirebase.auth().currentUser.updatePassword(password)
    .then(() => {
      return dispatch(showProfileMessage(null, 'successful/password'))
    })
    .catch( error => dispatch(showProfileMessage(error, null)))
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

export const updateUserToUsersSuccess = (updateObj) => {
  return {
    type: UPDATE_USER_TO_USERS_SUCCESS,
    updateObj
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