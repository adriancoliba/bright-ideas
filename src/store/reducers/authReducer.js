import {
  SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, RESET_USER_SUCCESS, AUTH_LISTENER_SUCCESS, AUTH_LISTENER_ERROR,
  SET_USER_AUTHENTICATED, SET_USER_DE_AUTHENTICATED, SET_SIGN_IN_MESSAGE, SET_SIGN_UP_MESSAGE, SET_RESET_MESSAGE,
  START_LOADING, ADD_USER_SUCCESS, UPDATE_USER_SUCCESS, GET_USERS_ALL_SUCCESS, GET_USER_ALL_SUCCESS
} from '../constants/authConstants'

const INITIAL_STATE = {
  user: null,
  userAll: null,
  userAllInitialized: false,
  usersAll: null,
  isUserAuthenticated: false,
  loginMessage: '',
  registerMessage: '',
  resetPasswordMessage: '',
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESS:
      return { ...state, loading: false, user: action.user };

    case SET_SIGN_IN_MESSAGE:
      return { ...state, loading: false, loginMessage: action.error === null ? action.customError : action.error.message };

    case SIGN_UP_USER_SUCCESS:
      return { ...state, loading: false, registerMessage: 'successful' };

    case SET_SIGN_UP_MESSAGE:
      return { ...state, loading: false, registerMessage: action.error === null ? action.customError : action.error.message };

    case RESET_USER_SUCCESS:
      return { ...state, loading: false, resetPasswordMessage: 'successful' };

    case SET_RESET_MESSAGE:
      return { ...state, loading: false, resetPasswordMessage: action.error === null ? action.customError : action.error.message };

    case AUTH_LISTENER_SUCCESS:
      return { ...state, user: action.user, isUserAuthenticated: true };

    case AUTH_LISTENER_ERROR:
      return { ...state, user: null };

    case SET_USER_AUTHENTICATED:
      return { ...state, isUserAuthenticated: true };

    case SET_USER_DE_AUTHENTICATED:
      return { ...state, isUserAuthenticated: false, user: null };

    case GET_USERS_ALL_SUCCESS:
      return {
        ...state,
        usersAll: action.usersAll
      };

    case GET_USER_ALL_SUCCESS:
      return {
        ...state,
        userAll: action.userAll,
        userAllInitialized: true
      };

    case START_LOADING:
      return { ...state, loading: true };

    default:
      return state
  }
};

export default authReducer;