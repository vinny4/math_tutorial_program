import {
  GET_CONTENT,
  GET_CONTENT_BY_ID,
  GET_CONTENT_BY_STRAND,
  GET_CONTENT_BY_TOPIC,
  GET_QUESTIONS,
  CONTENT_ERROR,
  CLEAR_CONTENT
} from '../actions/types';

const initialState = {
  content: [],
  currentContent: null,
  questions: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT:
      return {
        ...state,
        content: payload,
        loading: false
      };
    case GET_CONTENT_BY_ID:
      return {
        ...state,
        currentContent: payload,
        loading: false
      };
    case GET_CONTENT_BY_STRAND:
    case GET_CONTENT_BY_TOPIC:
      return {
        ...state,
        content: payload,
        loading: false
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
        loading: false
      };
    case CONTENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_CONTENT:
      return {
        ...state,
        currentContent: null,
        questions: []
      };
    default:
      return state;
  }
}
