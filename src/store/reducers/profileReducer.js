import {
  SET_PROFILE_MESSAGE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_PROFILE_MESSAGE,
  UPDATE_USER_TO_USERS_SUCCESS,
} from '../constants/profileConstants'

const INITIAL_STATE = {
  profileMessage: null,
  loading: false,
  changedPassword: false,
  newAvatarId: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE_MESSAGE:
      const customError = action.customError === 'successful/password' ? 'successful' : action.customError;
      return {
        ...state,
        loading: false,
        profileMessage: action.error === null ? customError : action.error.message,
        changedPassword: action.customError === 'successful/password',
      };

    case UPDATE_PROFILE_SUCCESS:
      return {...state, loading: false, profileMessage: 'successful'};

    case UPDATE_USER_TO_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        profileMessage: 'successful',
        newAvatarId: action.updateObj.avatarId,
      };

    case CLEAR_PROFILE_MESSAGE:
      return {...state, profileMessage: null};

    case START_LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state
  }
};

export default profileReducer;