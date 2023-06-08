// Начальное состояние
import {REDUX_COMMENTS_ACTION_TYPE} from "./types";

const initialState = {
  data: null,
  waiting: false,
  error: null,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_COMMENTS_ACTION_TYPE.commentsLoadStart:
      return {...state, data: null, waiting: true, error: null};

    case REDUX_COMMENTS_ACTION_TYPE.commentsLoadSuccess:

      return {...state, data: action.payload.data, waiting: false, error: null};

    case REDUX_COMMENTS_ACTION_TYPE.commentsLoadError:
      return {...state, data: null, waiting: false, error: action.payload};

    default:
      // Нет изменений
      console.log('123213', state);
      return state;
  }
}

export default reducer;
