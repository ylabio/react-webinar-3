// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
  success: true,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], waiting: true };

    case 'comments/load-success': {
      return { ...state, data: action.payload.data, waiting: false };
    }

    case 'comments/load-error':
      return { ...state, data: [], waiting: false };

    case 'comments/create-start':
      return { ...state, waiting: true, success: true };

    case 'comments/create-success': {
      return { ...state, success: true, waiting: false, data: action.payload.data };
    }

    case 'comments/create-error':
      return { ...state, success: false, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
