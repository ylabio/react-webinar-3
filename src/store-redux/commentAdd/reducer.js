// Начальное состояние
import {REDUX_COMMENT_ADD_ACTION_TYPE} from "./types";

const initialState = {
  data: null,
  waiting: false,
  error: null,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_COMMENT_ADD_ACTION_TYPE.commentAddStart:
      return {...state, data: null, waiting: true, error: null};

    case REDUX_COMMENT_ADD_ACTION_TYPE.commentAddSuccess:

      return {...state, data: action.payload.data, waiting: false, error: null};

    case REDUX_COMMENT_ADD_ACTION_TYPE.commentAddError:
      return {...state, data: null, waiting: false, error: action.payload};

    default:
      return state;
  }
}

export default reducer;
