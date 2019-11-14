import { myFirebase } from "../../utils/firebase";
import { SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, RESET_USER_SUCCESS, AUTH_LISTENER_SUCCESS, AUTH_LISTENER_ERROR, SET_USER_AUTHENTICATED,
  SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_MESSAGE, SET_SIGN_UP_MESSAGE, SET_RESET_MESSAGE, START_LOADING} from '../constants/authConstants';


export const signInUser = (user) => dispatch => {
  dispatch(startLoading());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then( u => {
      dispatch(signInUserSuccess(user));
      dispatch(authListener());
    })
    .catch( error => {
      dispatch(showSignInMessage(error, null))
  });
};

export const signInUserSuccess = (user) => {
  return {
    type: SIGN_IN_USER_SUCCESS,
    user: user,
  }
};

export const signUpUser = (user) => dispatch => {
  dispatch(startLoading());
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then( u => {
      myFirebase.auth().currentUser.updateProfile({
        displayName: `${user.firstName} ${user.lastName}`,
      }).then( () => {
        dispatch(signUpUserSuccess(user));
      }).catch( error => {
        console.log(error)
      });
    })
    .catch( error => {
      dispatch(showSignUpMessage(error, null))
    });
};

export const signUpUserSuccess = (user) => {
  return {
    type: SIGN_UP_USER_SUCCESS,
    user: user,
  }
};

export const resetPasswordUser = (email) => dispatch => {
  dispatch(startLoading());
  myFirebase
    .auth()
    .sendPasswordResetEmail(email)
    .then( u => {
      dispatch(resetPasswordUserSuccess())
    })
    .catch( error => {
      dispatch(showResetMessage(error, null))
    });

};

export const resetPasswordUserSuccess = () => {
  return {
    type: RESET_USER_SUCCESS,
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

export const showSignInMessage = (error, customError) => {
  return {
    type: SET_SIGN_IN_MESSAGE,
    error,
    customError
  }
};

export const showSignUpMessage = (error, customError) => {
  return {
    type: SET_SIGN_UP_MESSAGE,
    error,
    customError
  }
};

export const showResetMessage = (error, customError) => {
  return {
    type: SET_RESET_MESSAGE,
    error,
    customError
  }
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
};