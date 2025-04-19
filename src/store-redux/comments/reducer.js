// Начальное состояние
export const initialState = {
  comments: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, comments: [], count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, comments: action.payload.data.items, count: action.payload.data.count, waiting: false };

    case 'comments/load-error':
      return { ...state, comments: [], count: 0, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
