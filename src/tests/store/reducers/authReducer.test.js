import authReducer from "../../../store/reducers/authReducer";
import {
  SET_RESET_MESSAGE, SET_SIGN_IN_MESSAGE,
  GET_USERS_ALL_SUCCESS, RESET_USER_SUCCESS,
  AUTH_LISTENER_SUCCESS, GET_USER_ALL_SUCCESS,
  SET_SIGN_UP_MESSAGE, SET_USER_DE_AUTHENTICATED,
  SIGN_IN_USER_SUCCESS, SIGN_UP_USER_SUCCESS, START_LOADING
} from "../../../store/constants/authConstants";

test('should set up default reducer', () => {
  const state = authReducer(undefined, { type: '@@INIT'})
  expect(state).toEqual({
    user: null,
    userAll: null,
    userAllInitialized: false,
    usersAll: null,
    isUserAuthenticated: false,
    loginMessage: '',
    registerMessage: '',
    resetPasswordMessage: '',
    loading: false,
  })
});

test('should sign in user success', () => {
  const action = {
    type: SIGN_IN_USER_SUCCESS,
    user: {email: 'adrian.coliba5@gmail.com', displayName: 'adrian coliba'}
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.user).toEqual(action.user);
});

test('should set sign in message with Error', () => {
  const action = {
    type: SET_SIGN_IN_MESSAGE,
    error: {code: 'errooooor', message: 'big error'},
    customError: null,
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.loginMessage).toEqual(action.error.message);
});

test('should set sign in message with CustomError', () => {
  const action = {
    type: SET_SIGN_IN_MESSAGE,
    error: null,
    customError: 'this is a custom error',
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.loginMessage).toEqual(action.customError);
});

test('should sign up user success', () => {
  const state = authReducer(undefined, {type: SIGN_UP_USER_SUCCESS});
  expect(state.loading).toBeFalsy();
  expect(state.registerMessage).toBe('successful');
});

test('should set sign up message with Error', () => {
  const action = {
    type: SET_SIGN_UP_MESSAGE,
    error: {code: 'errooooor', message: 'big error'},
    customError: null,
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.registerMessage).toEqual(action.error.message);
});

test('should set sign up message with CustomError', () => {
  const action = {
    type: SET_SIGN_UP_MESSAGE,
    error: null,
    customError: 'this is a custom error',
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.registerMessage).toEqual(action.customError);
});

test('should reset user success', () => {
  const state = authReducer(undefined, {type: RESET_USER_SUCCESS});
  expect(state.loading).toBeFalsy();
  expect(state.resetPasswordMessage).toBe('successful');
});

test('should set reset password message with Error', () => {
  const action = {
    type: SET_RESET_MESSAGE,
    error: {code: 'errooooor', message: 'big error'},
    customError: null,
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.resetPasswordMessage).toEqual(action.error.message);
});

test('should set reset password message with CustomError', () => {
  const action = {
    type: SET_RESET_MESSAGE,
    error: null,
    customError: 'this is a custom error',
  };
  const state = authReducer(undefined, action);
  expect(state.loading).toBeFalsy();
  expect(state.resetPasswordMessage).toEqual(action.customError);
});

test('should auth listener success', () => {
  const action = {
    type: AUTH_LISTENER_SUCCESS,
    user: {email: 'adrian.coliba5@gmail.com', id: '65fgfaFSw33Gkl334'}
  };
  const state = authReducer(undefined, action);
  expect(state.isUserAuthenticated).toBeTruthy();
  expect(state.user).toEqual(action.user);
});

test('should set user de-authenticated', () => {
  const state = authReducer(undefined, {type: SET_USER_DE_AUTHENTICATED});
  expect(state.isUserAuthenticated).toBeFalsy();
  expect(state.user).toBe(null);
});

test('should get users all success', () => {
  const action = {
    type: GET_USERS_ALL_SUCCESS,
    usersAll: [
      {email: 'adrian.coliba5@gmail.com', id: '65fgfaFSw33Gkl334'},
      {email: 'dorin.sver1@gmail.com', id: '8g4345dg33G5jFG34'}
    ]
  };
  const state = authReducer(undefined, action);
  expect(state.usersAll).toEqual(action.usersAll);
});

test('should get user success', () => {
  const action = {
    type: GET_USER_ALL_SUCCESS,
    userAll: {email: 'adrian.coliba5@gmail.com', id: '65fgfaFSw33Gkl334', displayName: 'adrian coliba'}
  };
  const state = authReducer(undefined, action);
  expect(state.userAllInitialized).toBeTruthy();
  expect(state.userAll).toEqual(action.userAll);
});

test('start loading', () => {
  const state = authReducer(undefined, {type: START_LOADING});
  expect(state.loading).toBeTruthy();
});