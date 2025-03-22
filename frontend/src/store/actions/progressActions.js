import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_PROGRESS,
  UPDATE_PROGRESS,
  GET_PROGRESS_REPORT,
  GET_SUGGESTIONS,
  PROGRESS_ERROR
} from './types';

// Get user progress
export const getProgress = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/progress/${userId}`);

    dispatch({
      type: GET_PROGRESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update progress
export const updateProgress = (contentId, completed, score, timeSpent) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ contentId, completed, score, timeSpent });

    const res = await axios.post('/api/progress', body, config);

    dispatch({
      type: UPDATE_PROGRESS,
      payload: res.data
    });

    dispatch(setAlert('Progress updated', 'success'));
  } catch (err) {
    dispatch({
      type: PROGRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get progress report
export const getProgressReport = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/progress/report/${userId}`);

    dispatch({
      type: GET_PROGRESS_REPORT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get improvement suggestions
export const getSuggestions = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/progress/suggestions/${userId}`);

    dispatch({
      type: GET_SUGGESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
