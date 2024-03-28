// Начальное состояние
export const initialState = {
  comments: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, comments: [], count: 0, waiting: true};

    case "comments/load-success": {
      return {...state, comments: action.payload.comments, count: action.payload.count, waiting: false};
    }

    case "comments/create-new": {
      return {...state, comments: [...state.comments, action.payload.comment], count: state.count + 1, waiting: false};
    }

    case "comments/load-error":
      return {...state, comments: [], count: 0, waiting: false};

    default:
      return state;
  }
}

export default reducer;
