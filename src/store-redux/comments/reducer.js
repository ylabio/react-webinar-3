// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  error: null,
  waiting: false, // признак ожидания загрузки
  postWaiting: false,
  postError: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], count: 0, error: null, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], count: 0, error: action.payload.error, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/post-start':
      return { ...state, postWaiting: true, postError: null, };

    case 'comments/post-success':
      return { ...state, postWaiting: false, };

    case 'comments/post-error':
      return { ...state, postWaiting: false, postError: action.payload.error, };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
