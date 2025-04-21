// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false };

    case 'comments/create-comment-start': {
      return { ...state, waiting: true };
    }

    case 'comments/create-comment-success': {
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload.newComment],
          count: state.data.count + 1,
        },
        waiting: false,
      };
    }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
