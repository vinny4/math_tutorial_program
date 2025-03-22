import {
  GET_TERMS,
  CREATE_TERM,
  UPDATE_TERM,
  GET_TERM_TOPICS,
  TERM_ERROR
} from '../actions/types';

const initialState = {
  terms: [],
  currentTerm: null,
  topics: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TERMS:
      return {
        ...state,
        terms: payload,
        loading: false
      };
    case CREATE_TERM:
      return {
        ...state,
        terms: [payload, ...state.terms],
        loading: false
      };
    case UPDATE_TERM:
      return {
        ...state,
        terms: state.terms.map(term => 
          term._id === payload._id ? payload : term
        ),
        loading: false
      };
    case GET_TERM_TOPICS:
      return {
        ...state,
        topics: payload,
        loading: false
      };
    case TERM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
