import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_CONTENT,
  GET_CONTENT_BY_ID,
  GET_CONTENT_BY_STRAND,
  GET_CONTENT_BY_TOPIC,
  GET_QUESTIONS,
  CONTENT_ERROR,
  CLEAR_CONTENT
} from './types';

// Get all content
export const getContent = () => async dispatch => {
  try {
    const res = await axios.get('/api/content');

    dispatch({
      type: GET_CONTENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get content by ID
export const getContentById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/content/${id}`);

    dispatch({
      type: GET_CONTENT_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get content by strand
export const getContentByStrand = strand => async dispatch => {
  try {
    const res = await axios.get(`/api/content/strand/${strand}`);

    dispatch({
      type: GET_CONTENT_BY_STRAND,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get content by topic
export const getContentByTopic = topic => async dispatch => {
  try {
    const res = await axios.get(`/api/content/topic/${topic}`);

    dispatch({
      type: GET_CONTENT_BY_TOPIC,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get questions for content
export const getQuestions = contentId => async dispatch => {
  try {
    const res = await axios.get(`/api/content/questions/${contentId}`);

    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Clear current content
export const clearContent = () => dispatch => {
  dispatch({ type: CLEAR_CONTENT });
};
