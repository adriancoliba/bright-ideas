import { SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, RESET_USER_SUCCESS, AUTH_LISTENER_SUCCESS,  AUTH_LISTENER_ERROR, SET_USER_AUTHENTICATED,
  SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_MESSAGE, SET_SIGN_UP_MESSAGE, SET_RESET_MESSAGE, START_LOADING } from '../constants/authConstants'

const INITIAL_STATE = {
  user: null,
  isUserAuthenticated: false,
  loginMessage: '',
  registerMessage: '',
  resetPasswordMessage: '',
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESS:
      return { loading: false, user: action.user };

    case SET_SIGN_IN_MESSAGE:
      return { loading: false, loginMessage: action.error === null ? action.customError : action.error.message };

    case SIGN_UP_USER_SUCCESS:
      return { loading: false, registerMessage: 'successful' };

    case SET_SIGN_UP_MESSAGE:
      return { loading: false, registerMessage: action.error === null ? action.customError : action.error.message };

    case RESET_USER_SUCCESS:
      return { loading: false, resetPasswordMessage: 'successful' };

    case SET_RESET_MESSAGE:
      return { loading: false, resetPasswordMessage: action.error === null ? action.customError : action.error.message };

    case AUTH_LISTENER_SUCCESS:
      return { user: action.user, isUserAuthenticated: true };

    case AUTH_LISTENER_ERROR:
      return { user: null };

    case SET_USER_AUTHENTICATED:
      return { isUserAuthenticated: true };

    case SET_USER_DE_AUTHENTICATED:
      return { isUserAuthenticated: false, user: null };

    case START_LOADING:
      return { loading: true };

    default:
      return state
  }
};

export default authReducer;