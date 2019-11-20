import { myFirebase } from "../../utils/firebase";
import { SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, RESET_USER_SUCCESS, AUTH_LISTENER_SUCCESS, AUTH_LISTENER_ERROR,
  SET_USER_AUTHENTICATED, SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_MESSAGE, SET_SIGN_UP_MESSAGE, GET_USERS_ALL_SUCCESS, GET_USER_ALL_SUCCESS,
  SET_RESET_MESSAGE, START_LOADING, UPDATE_USER_SUCCESS} from '../constants/authConstants';

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
      .then( u => {
        const currentUser = myFirebase.auth().currentUser;
        const displayName = `${user.firstName} ${user.lastName}`;

        currentUser.updateProfile({
          displayName: displayName,
          photoURL: JSON.stringify({profileInfo: 'I\'m cool...', avatarId: 'a1'})
        }).then( () => {
          dispatch(signUpUserSuccess(user));
          dispatch(addUserToUsers(currentUser.uid, displayName));
        }).catch( error => {
          console.log(error)
        });
      })
      .catch( error => {
        dispatch(showSignUpMessage(error, null))
      })
  )
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

export const authListener = () => (dispatch) => {
  return (
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userDetails = {
          email: user.email,
          id: user.uid,
          displayName: user.displayName,
          photoURL: JSON.parse(user.photoURL)
        };
        localStorage.setItem('uid', user.uid);
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

export const addUserToUsers = (uid, displayName) => {
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
      })
      .then( () => {
        console.log('added')
      })
  )
};

export const updateUserToUsersSuccess = (userAllId, displayName, avatarAndProfileInfo) => {
  return () => {
    const updateObj = {};
    Object.assign(updateObj,
      displayName !== 'no' && { displayName: displayName },
      avatarAndProfileInfo !== 'no' && { avatarId: avatarAndProfileInfo.avatarId, profileInfo: avatarAndProfileInfo.profileInfo },
    );
    const updateRef = myFirebase.firestore().collection("usersAll").doc(userAllId);
    return updateRef.update(updateObj)
    .then(function() {

    })
    .catch(function(error) {

    });

  }
};

export const updateUserSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
  }
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