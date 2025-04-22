// Начальное состояние
export const initialState = {
  items: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  error: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    // Загрузка комментариев
    case 'comments/load-start':
      return { ...state, items: [], count: 0, waiting: true, error: null };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
        error: null,
      };

    case 'comments/load-error':
      return { ...state, items: [], count: 0, waiting: false, error: action.payload.error };
    // Создание комментария
    case 'comments/create-start':
      return { ...state, waiting: true, error: null };

    case 'comments/create-success':
      return {
        ...state,
        items: [...state.items, action.payload.data],
        count: state.count + 1,
        waiting: false,
        error: null,
      };

    case 'comments/create-error':
      return { ...state, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
