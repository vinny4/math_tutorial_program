import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import contentReducer from './contentReducer';
import progressReducer from './progressReducer';
import termReducer from './termReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  content: contentReducer,
  progress: progressReducer,
  term: termReducer
});
