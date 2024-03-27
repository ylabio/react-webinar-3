// Начальное состояние
export const initialState = {
  count: 0,
  items: [],
  waiting: false, // признак ожидания загрузки
  sending: false, // признак ожидания отправки
  message: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, message: '', count: 0, items: [], waiting: true};

    case "comments/load-success":
      return {...state, count: action.payload.count, items: action.payload.items, waiting: false};

    case "comments/load-error":
      return {...state, message: action.payload.message, count: 0, items: [], waiting: false};

    case "comments/send-start":
      return {...state, message: '', sending: true};

    case "comments/send-success":
      return {...state, count: state.count + 1, items: [...state.items, action.payload.comment], sending: false};
      
    case "comments/send-error":
      return {...state, message: action.payload.message, sending: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
