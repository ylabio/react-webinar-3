// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    // Загрузка комментариев load
    case 'comment/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comment/load-error':
      return { ...state, data: {}, waiting: false };

    // Создание комментариев create
    case 'comment/create-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/create-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comment/create-error':
      return { ...state, data: {}, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
