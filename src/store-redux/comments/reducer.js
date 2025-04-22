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

    case "comments/reply-start":
      return { ...state, waiting: true};

    case "comments/reply-success":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1,
        waiting: false
      };

    case "comments/reply-error":
      return { ...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
