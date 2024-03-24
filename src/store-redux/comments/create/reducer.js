// Начальное состояние
export const initialState = {
  result: {},
  success_create: false,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "create_comment/load-start":
      return {...state, result: {}, success_create: false, waiting: true};

    case "create_comment/load-success":
      return {...state, result: action.payload.data, success_create: true, waiting: false};

    case "create_comment/load-error":
      return {...state, result: {}, success_create: false, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;