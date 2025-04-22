
// Начальное состояние
export const initialState = {
  items: [],
  count: 0,
  activeCommentId: null,
  waiting: false, // признак ожидания загрузки
  error: '',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, items: [], count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, items: action.payload.items, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, items: [], count: 0, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/set-active-comment':
      return { ...state, activeCommentId: action.payload };

    case 'comments/send-start':
      return { ...state, waiting: true };

    case 'comments/send-success':
      return { ...state, items: [...state.items, action.payload], count: state.count + 1, waiting: false };
    
    case 'comments/send-error':
      return { ...state, waiting: false, error: 'Ошибка'};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
