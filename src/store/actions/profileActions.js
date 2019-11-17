import { myFirebase } from "../../utils/firebase";
import { SET_PROFILE_MESSAGE, UPDATE_PROFILE_SUCCESS, START_LOADING, CLEAR_PROFILE_MESSAGE, } from "../constants/profileConstants";

export const updateProfile = (displayName, password) => dispatch => {
  dispatch(startLoading());
  console.log('actiondisplayName', displayName)
  if(displayName !== 'no'){
    console.log('displayName !== \'no\'', displayName !== 'no')
    myFirebase.auth().currentUser.updateProfile({displayName: displayName})
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