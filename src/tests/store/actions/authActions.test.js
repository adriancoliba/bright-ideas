import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {
  authListenerSuccess,
  showSignInMessage,
  signInUser,
  signInUserSuccess,
  startLoading,
  signUpUser,
  authListener,
  updateUserToUsers,
  getUsersAll,
  getUserAll,
} from '../../../store/actions/authActions';
import {
  SET_SIGN_IN_MESSAGE,
  SIGN_IN_USER_SUCCESS,
  SET_SIGN_UP_MESSAGE,
  START_LOADING,
  AUTH_LISTENER_SUCCESS
} from "../../../store/constants/authConstants";

const createMockStore = configureStore([thunk]);

test('should user sign in successfully', (done) => {
  const user = { email: "adrian.coliba5@gmail.com", password: "123123" };
  const store = createMockStore({});
  const actions = store.getActions();
  store.dispatch(signInUser(user))
    .then(() => {
      expect(actions[0]).toEqual({
        type: START_LOADING,
      });
      done();
    })
    .catch(error => {
      const customError = null;
      expect(actions[0]).toEqual({
        type: SET_SIGN_IN_MESSAGE,
        error,
        customError
      })
    })
});

test('should dispatch correct actions when signInUser', (done) => {
  const user = { email: "adrian.coliba5@gmail.com", password: "123123" };
  const store = createMockStore({});
  return store.dispatch(signInUser(user))
    .then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
});

test('1. should add signed in user to users collection', () => {
  const user = { email: "adrian.coliba5@gmail.com", password: "123456" };
  const action = signInUserSuccess(user);
  expect(action).toEqual({
    type: SIGN_IN_USER_SUCCESS,
    user: user,
  })
});

test('2. should add signed in user to users collection', () => {
  const user = { email: "adrian.coliba5@gmail.com", password: "123456" };
  const action = signInUserSuccess(user);
  expect(action).toMatchSnapshot();
});

//COMMENTED THIS OUT BECAUSE IT CREATES TOO MANY REQUESTS IN USERS COLLECTION
// test('should dispatch correct actions when signUpUser', (done) => {
//   const user = {
//     email: "adrian.colba15@gmail.com",
//     password: "123456",
//     firstName: 'adrian',
//     lastName: 'coliba'
//   };
//   const store = createMockStore({});
//   return store.dispatch(signUpUser(user))
//     .then(() => {
//       expect(store.getActions()).toMatchSnapshot();
//       done();
//     });
// });

test('should user sign up successfully', (done) => {
  const user = {
    email: "adrian.colba15@gmail.com",
    password: "123456",
    firstName: 'adrian',
    lastName: 'coliba'
  };
  const store = createMockStore({});
  const actions = store.getActions();

  store.dispatch(signUpUser(user)).then(() => {
    expect(actions[0]).toEqual({
      type: 'AUTH/START_LOADING'
    });
    done();
  })
    .catch((error) => {
    const customError = null;
    expect(actions[0]).toEqual({
      type: SET_SIGN_UP_MESSAGE,
      error,
      customError
    });
    done();
  })
});

// COMMENTED THIS OUT BECAUSE FIREBASE BLOCKED this requests for security reasons.
// test('should reset password user', (done) => {
//   const email = 'adrian.coliba5@gmail.com'
//   const store = createMockStore({});
//   const actions = store.getActions();
//
//   store.dispatch(resetPasswordUser(email)).then(() => {
//     expect(actions[0]).toEqual({
//       type: 'AUTH/START_LOADING'
//     });
//     expect(actions[1]).toEqual({
//       type: 'AUTH/RESET_USER_SUCCESS'
//     });
//     done();
//   })
//     .catch((error) => {
//       const customError = null;
//       expect(actions[0]).toEqual({
//         type: SET_SIGN_UP_MESSAGE,
//         error,
//         customError
//       });
//       done();
//     })
// });

test('should dispatch correct actions when authListener', async (done) => {
  const store = createMockStore({});
  await store.dispatch(authListener());
  const actions = store.getActions();
  expect(actions).toMatchSnapshot();
  done();
});

test('should dispatch correct actions when getUsersAll', async (done) => {
  const store = createMockStore({});
  await store.dispatch(getUsersAll());
  const actions = store.getActions();
  expect(actions).toMatchSnapshot();
  done();
});

test('1. auth listener is successful', () => {
  const user = {email: 'adrian.colba15@gmail.com', id: 'dfg432ghFas2F3'};
  const action = authListenerSuccess(user);
  expect(action).toEqual({
    type: AUTH_LISTENER_SUCCESS,
    user: user
  })
});

test('2. auth listener is successful', () => {
  const user = {email: 'adrian.colba15@gmail.com', id: 'dfg432ghFas2F3'};
  const action = authListenerSuccess(user);
  expect(action).toMatchSnapshot();
});

test('started loading', () => {
  const action = startLoading();
  expect(action).toEqual({type: START_LOADING})
});

test('show Sign In Message', () => {
  const errors = [
    { error: {code: 'Something went wrong', message: 'something went wrong'},
      customError: null
    },
    { error: null, customError: 'Complete all fields' },
  ];

  const action1 = showSignInMessage(errors[0].error, errors[0].customError);
  expect(action1).toEqual({
    type: SET_SIGN_IN_MESSAGE,
    error: errors[0].error,
    customError: errors[0].customError
  });
  const action2 = showSignInMessage(errors[1].error, errors[1].customError);
  expect(action2).toEqual({
    type: SET_SIGN_IN_MESSAGE,
    error: errors[1].error,
    customError: errors[1].customError
  });
});

test('should dispatch correct actions when updateUserToUsers',  (done) => {
  const userAllDocId = '8dsf63Fd3GG3';
  const displayName = 'adrian coliba';
  const profileInfo = 'i\'m cool...';
  const avatarId = 'a22';
  const store = createMockStore({});
  store.dispatch(updateUserToUsers(userAllDocId, displayName, profileInfo, avatarId));
  expect(store.getActions()).toMatchSnapshot();
  done();
});

test('should add user to users collection', (done) => {
  const email = 'adrian.coliba5@gmail.com';
  const uid = 'adas343fdfg3';
  const displayName= 'adrian col';
  const store = createMockStore({});
  const actions = store.getActions();
  done();

  // COMMENTED THIS OUT BECAUSE OF TOO REQUESTS.
  // store.dispatch(addUserToUsers(uid, displayName, email)).then(() => {
  //   expect(actions[0]).toEqual({
  //     type: 'AUTH/START_LOADING'
  //   });
  //   expect(actions[1]).toEqual({
  //     type: 'AUTH/RESET_USER_SUCCESS'
  //   });
  //
  //   done();
  // })
  //   .catch((error) => {
  //   const customError = null;
  //   expect(actions[0]).toEqual({
  //     type: SET_SIGN_UP_MESSAGE,
  //     error,
  //     customError
  //   });
  //   done();
  // })
});

test('should dispatch correct user by id when getUserAll action', (done) => {
  const uid = 'DmX47RUNGKhQdIcR9mmFTcwoD4w1';
  const store = createMockStore({});
  return store.dispatch(getUserAll(uid))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0].userAll.uid).toBe(uid);
      done();
    });
});