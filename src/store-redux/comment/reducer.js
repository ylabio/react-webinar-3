// Начальное состояние
export const initialState = {
  list: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load-start":
      return {...state, list: [], waiting: true};

    case "comment/load-success":
      return {...state, list: action.payload.data, waiting: false};

    case "comment/load-error":
      return {...state, list: [], waiting: false};

    case "comment/add-start":
      return {...state, waiting: true};

    case "comment/add-success":
      return {...state, list: [...state.list, action.payload.data], waiting: false};

    case "comment/add-error":
      return {...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
