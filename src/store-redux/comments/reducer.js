// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], count: 0, waiting: false };

    case 'comments/set-reply-action':
      return { ...state,
        data: [...state.data, action.payload] };


    case 'comments/set-reply-comment':
      return { ...state,
        count: state.count + 1,
        data: [...state.data, action.payload] };


    case 'comments/remove-reply-action':
      return {
        ...state,
        data: state.data.filter(comment => comment._id !== 'reply'),
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
