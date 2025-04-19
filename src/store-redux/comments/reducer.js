import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
} from '../../store/comments';
  
const initialState = {
  items: [],
  waiting: false,
  error: null,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
    case POST_COMMENT_REQUEST:
      return { ...state, waiting: true, error: null };

    case FETCH_COMMENTS_SUCCESS:
      return { ...state, waiting: false, items: action.payload };

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        waiting: false,
        items: [...state.items, action.payload],
      };

    case FETCH_COMMENTS_FAILURE:
    case POST_COMMENT_FAILURE:
      return { ...state, waiting: false, error: action.error };

    default:
      return state;
  }
}
  