// Начальное состояние
export const initialState = {
  data: [],
  authors: {},
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
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/load-author-start': {
      return { ...state, authors: {}, waiting: true };
    }

    case 'comments/load-author-success': {
      const newstate = {
        ...state,
        authors: { ...state.authors, [action.payload.id]: action.payload.data },
        waiting: false,
      };
      console.log(newstate);
      return newstate;
    }
    case 'comments/load-author-error': {
      return { ...state, data: {}, waiting: false };
    }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
