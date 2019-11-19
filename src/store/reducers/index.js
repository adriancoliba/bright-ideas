import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authReducer from './authReducer';
import notepadReducer from './notepadReducer';
import profileReducer from './profileReducer';
import blogReducer from './blogReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  notepad: notepadReducer,
  profile: profileReducer,
  blog: blogReducer,
});

export default rootReducer;