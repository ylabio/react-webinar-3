// Начальное состояние
export const initialState = {
  data: [],
  waiting: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false, count: action.payload.count};

    case "comments/load-error":
      return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

    case "comments/create-start":
      return {...state, waiting: true};

    case "comments/create-success":
      return {...state, data: action.payload.data, waiting: false, count: action.payload.count};

    case "comments/create-error":
      return {...state, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
