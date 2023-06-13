// Начальное состояние
const initialState = {
  data: {},
  count: 0,
  waiting: false, // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, count: action.payload.data.items.length, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?



    case "comments/add-start":
      return { ...state, waiting: true };

    case "comments/add-success":
      const items = { items: [...state.data.items, action.payload.comment] }
      return { ...state, data: items, count: action.payload.count, waiting: false };

    case "comments/add-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?


    default:
      // Нет изменений
      return state;
  }
}

export default reducer;