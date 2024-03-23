// Начальное состояние
export const initialState = {
  count: 0,
  items: [],
  waiting: false, // признак ожидания загрузки
  sending: false, // признак ожидания отправки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, count: 0, items: [], waiting: true};

    case "comments/load-success":
      return {...state, count: action.payload.count, items: action.payload.items, waiting: false};

    case "comments/load-error":
      return {...state, count: 0, items: [], waiting: false}; //@todo текст ошибки сохранять?

    case "comments/send-start":
      return {...state, sending: true};

    case "comments/send-success":
      return {...state, count: state.count + 1, items: [...state.items, action.payload.comment], sending: false};
      
    case "comments/send-error":
      return {...state, sending: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
