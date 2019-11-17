import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notepadReducer from './notepadReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notepad: notepadReducer,
  profile: profileReducer,
});

export default rootReducer;