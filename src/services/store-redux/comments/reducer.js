// Начальное состояние
const initialState = {
  data: {},
  waiting: false,
  error: null, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true, error: null };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return {
        ...state,
        waiting: false,
        error: action.payload.error,
      };

    case 'comments/post-start':
      return { ...state, waiting: true, error: null };

    case 'comments/post-success': {
      return {
        ...state,
        data: {
          count: state.data.count + 1,
          items: [...state.data.items, action.payload.item],
        },
        waiting: false,
      };
    }

    case 'comments/post-error':
      console.log('here');
      console.log(action.payload);
      return { ...state, waiting: false, error: action.payload.error };

    case 'comment/reset-error':
      return { ...state, waiting: false, error: null };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
