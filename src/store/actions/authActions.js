import { myFirebase } from "../../utils/firebase";
import { SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, RESET_USER_SUCCESS, AUTH_LISTENER_SUCCESS, AUTH_LISTENER_ERROR,
  SET_USER_AUTHENTICATED, SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_MESSAGE, SET_SIGN_UP_MESSAGE, GET_USERS_ALL_SUCCESS, GET_USER_ALL_SUCCESS,
  SET_RESET_MESSAGE, START_LOADING, UPDATE_USER_SUCCESS} from '../constants/authConstants';
import {updateUserToUsersSuccess} from "./profileActions";

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
  return (
    myFirebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then ( u => {
        const currentUser = myFirebase.auth().currentUser;
        const displayName = `${user.firstName} ${user.lastName}`;
        dispatch(signUpUserSuccess());
        dispatch(addUserToUsers(currentUser.uid, displayName, user.email));
      })
      .catch( error => {
        dispatch(showSignUpMessage(error, null))
      })
  )
};

export const signUpUserSuccess = () => {
  return {
    type: SIGN_UP_USER_SUCCESS,
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

export const authListener = () => (dispatch) => {
  return (
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userDetails = {
          email: user.email,
          id: user.uid,
        };
        localStorage.setItem('uid', user.uid);
        dispatch(getUsersAll());
        dispatch(getUserAll(user.uid));
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
  localStorage.clear();
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

export const addUserToUsers = (uid, displayName, email) => dispatch => {
  return (
    myFirebase
      .firestore()
      .collection('usersAll')
      .add({
        uid: uid,
        displayName: displayName,
        profileInfo: 'I\'m cool...',
        avatarId: 'a1',
        date: new Date(),
        email: email,
      })
      .then( () => {
        console.log('added')
      })
  )
};

export const deleteUserToUsers = (id) => dispatch => {
  const userAllRef = myFirebase.firestore().collection('usersAll').doc(id);
  return userAllRef.delete()
    .then(() => {
      console.log('deleted')
    })
    .catch( error => {
      console.log('error', error)
    })
};

export const updateUserToUsers = (userAllDocId, displayName, profileInfo, avatarId) => dispatch => {
  const updateObj = {};
  Object.assign(updateObj,
    displayName !== 'no' && { displayName: displayName },
    profileInfo !== 'no' && { profileInfo: profileInfo },
    avatarId !== 'no' && { avatarId: avatarId },
  );
  const updateRef = myFirebase.firestore().collection("usersAll").doc(userAllDocId);
  return updateRef.update(updateObj)
    .then(function() {
      dispatch(updateUserToUsersSuccess(updateObj))
    })
    .catch(function(error) {

    });
};

export const getUsersAll = () => dispatch => {
  return (
    myFirebase
      .firestore()
      .collection('usersAll')
      .onSnapshot(serverUpdate => {
        const usersAll = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        dispatch(getUsersAllSuccess(usersAll));
      })
  )
};

export const getUsersAllSuccess = (usersAll) => {
  return {
    type: GET_USERS_ALL_SUCCESS,
    usersAll,
  }
};

export const getUserAll = (uid) => dispatch => {
  return (
    myFirebase
      .firestore()
      .collection('usersAll')
      .where('uid', '==', uid)
      .get()
      .then( serverUpdate => {
        const userAll = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        return dispatch(getUserAllSuccess(userAll[0]))
      })
  )
};

export const getUserAllSuccess = (userAll) => {
  return {
    type: GET_USER_ALL_SUCCESS,
    userAll,
  }
};