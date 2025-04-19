// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  count: {},
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, count: {}, waiting: true };

    case 'comments/load-success': 
      return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, count: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
