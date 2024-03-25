// Начальное состояние
export const initialState = {
  list: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, list: [], waiting: true};

    case "comments/load-success":
      return {...state, list: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return {...state, list: [], waiting: false}; //@todo текст ошибки сохранять?

    case "comments/push-new-comment":
      return {...state, list: [...state.list, action.payload.newComment]};
  
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;