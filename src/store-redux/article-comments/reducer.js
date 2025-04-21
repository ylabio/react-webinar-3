export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'article-comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'article-comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'article-comments/load-error':
      return { ...state, data: action.payload.data, waiting: false }; //@todo текст ошибки сохранять?

    case 'article-comments/post-comment-start': {
      return { ...state, waiting: true };
    }
    case 'article-comments/post-comment-error': {
      return { ...state, data: action.payload.data, waiting: false };
    }
    case 'article-comments/post-comment-end': {
      return { ...state, data: {items:[...state.data.items, action.payload.answ]}, waiting: false };
    }
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
