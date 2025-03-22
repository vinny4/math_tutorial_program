import {
  GET_PROGRESS,
  UPDATE_PROGRESS,
  GET_PROGRESS_REPORT,
  GET_SUGGESTIONS,
  PROGRESS_ERROR
} from '../actions/types';

const initialState = {
  progress: [],
  report: null,
  suggestions: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROGRESS:
      return {
        ...state,
        progress: payload,
        loading: false
      };
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: state.progress.map(item => 
          item.contentId === payload.contentId ? payload : item
        ),
        loading: false
      };
    case GET_PROGRESS_REPORT:
      return {
        ...state,
        report: payload,
        loading: false
      };
    case GET_SUGGESTIONS:
      return {
        ...state,
        suggestions: payload,
        loading: false
      };
    case PROGRESS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
