// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
  error: null,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: [], waiting: false, error: action.payload.data};

    case "comments/upload-success":
      return {...state, data: [...state.data, action.payload.data], waiting: false};

    case "comments/upload-error":
      return {...state, waiting: false, error: action.payload.data};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
