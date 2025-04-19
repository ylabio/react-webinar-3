// Начальное состояние
export const initialState = {
  data: [],
  waiting: true, // признак ожидания загрузки
  error: '',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comment/load-error':
      return { ...state, data: {}, waiting: false, error: action.payload.error }; //@todo текст ошибки сохранять?

    case 'comment/post-start':
      return { ...state, waiting: true };

    case 'comment/post-error':
      return { ...state, waiting: false, error: action.payload.error };

    case 'comment/reply-start':
      return { ...state, waiting: true };

    case 'comment/reply-error':
      return { ...state, waiting: false, error: action.payload.error };
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
