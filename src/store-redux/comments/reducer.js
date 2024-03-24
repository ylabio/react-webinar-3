// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  data2: null,
  waiting2: false
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/send-start":
      return {...state, data2: {}, waiting2: true};

    case "comments/send-success":
      return {...state, data2: action.payload.data, waiting2: false};

    case "comments/send-error":
      return {...state, data2: {}, waiting2: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
