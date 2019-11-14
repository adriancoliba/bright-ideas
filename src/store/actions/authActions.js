import { myFirebase } from "../../utils/firebase";
import { SIGN_IN_USER_SUCCESS, AUTH_LISTENER_SUCCESS, AUTH_LISTENER_ERROR, SET_USER_AUTHENTICATED,
  SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_ERROR_MESSAGE, SET_SIGN_UP_ERROR_MESSAGE
} from '../constants/authConstants';


export const signInUser = (user) => dispatch => {
    myFirebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then( u => {
        dispatch(signInUserSuccess(user));
        dispatch(authListener());
      })
      .catch( error => {
        dispatch(showSignInErrorMessage(error))
    });
};

export const signInUserSuccess = (user) => {
  return {
    type: SIGN_IN_USER_SUCCESS,
    user: user,
  }
};

export const authListener = () => dispatch => {
  return (
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userDetails = {
          email: user.email,
          id: user.uid,
          displayName: user.displayName,
        };
        dispatch(authListenerSuccess(userDetails))
      } else if (!user) {
        dispatch(authListenerError());
      }
    })
  )
};

export const authListenerSuccess = (user) => {
  return {
    type: AUTH_LISTENER_SUCCESS,
    user: user
  }
};

export const authListenerError = () => {
  return {
    type: AUTH_LISTENER_ERROR
  }
};

export const setUserAuthenticated = () => {
  return {
    type: SET_USER_AUTHENTICATED
  }
};

export const setUserDeAuthenticated = () => {
  return {
    type: SET_USER_DE_AUTHENTICATED
  }
};

export const showSignInErrorMessage = (error) => {
  return {
    type: SET_SIGN_IN_ERROR_MESSAGE,
    error,
  }
};

export const showSignUpErrorMessage = (error, customError) => {
  return {
    type: SET_SIGN_UP_ERROR_MESSAGE,
    error,
    customError
  }
};