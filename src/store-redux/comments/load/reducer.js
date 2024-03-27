// Начальное состояние
export const initialState = {
  count: 0,
  items: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, count: 0, items: [], waiting: true};

    case "comments/load-success":
      return {
        ...state, 
        count: action.payload.data.count,
        items:  action.payload.data.items,
        waiting: false
      };

    case "comments/load-error":
      return {...state, count: 0, items: [], waiting: false}; //@todo текст ошибки сохранять?

    case "add_comment/update-success":
      return {
        ...state, 
        count: state.count + 1, 
        items: [...state.items, action.payload.data]
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
