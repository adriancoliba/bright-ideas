import { SIGN_IN_USER_SUCCESS, AUTH_LISTENER_SUCCESS,  AUTH_LISTENER_ERROR, SET_USER_AUTHENTICATED,
  SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_ERROR_MESSAGE } from '../constants/authConstants'

const INITIAL_STATE = {
  user: null,
  isUserAuthenticated: false,
  loginMessage: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESS:
      return { user: action.user };

    case AUTH_LISTENER_SUCCESS:
      return { user: action.user, isUserAuthenticated: true };

    case AUTH_LISTENER_ERROR:
      return { user: null };

    case SET_USER_AUTHENTICATED:
      return { isUserAuthenticated: true };

    case SET_USER_DE_AUTHENTICATED:
      return { isUserAuthenticated: false, user: null };

    case SET_SIGN_IN_ERROR_MESSAGE:
      return { loginMessage: action.error.message };

    default:
      return state
  }
};

export default authReducer;