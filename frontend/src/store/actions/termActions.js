import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_TERMS,
  CREATE_TERM,
  UPDATE_TERM,
  GET_TERM_TOPICS,
  TERM_ERROR
} from './types';

// Get all terms
export const getTerms = () => async dispatch => {
  try {
    const res = await axios.get('/api/terms');

    dispatch({
      type: GET_TERMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TERM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create new term
export const createTerm = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/terms', formData, config);

    dispatch({
      type: CREATE_TERM,
      payload: res.data
    });

    dispatch(setAlert('Term created', 'success'));
  } catch (err) {
    dispatch({
      type: TERM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update term
export const updateTerm = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/terms/${id}`, formData, config);

    dispatch({
      type: UPDATE_TERM,
      payload: res.data
    });

    dispatch(setAlert('Term updated', 'success'));
  } catch (err) {
    dispatch({
      type: TERM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get topics for term
export const getTermTopics = id => async dispatch => {
  try {
    const res = await axios.get(`/api/terms/${id}/topics`);

    dispatch({
      type: GET_TERM_TOPICS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TERM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete a term
export const deleteTerm = (id) => async dispatch => {
  try {
    await axios.delete(`/api/terms/${id}`);

    dispatch(setAlert('Term deleted', 'success'));

    // Refresh term list after deletion
    dispatch(getTerms());
  } catch (err) {
    dispatch({
      type: TERM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
