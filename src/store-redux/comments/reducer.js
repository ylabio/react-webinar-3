

// Начальное состояние
const initialState = {
  data: [],
  waiting: false
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false};

    case "comments/send":
      return { ...state, data: [...state.data, action.payload.data.result], waiting: false }
    case "comments/reply":
      return { ...state, data: [...state.data, action.payload.data.result], waiting: false}
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
