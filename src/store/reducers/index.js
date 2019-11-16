import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notepadReducer from './notepadReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notepad: notepadReducer,
});

export default rootReducer;