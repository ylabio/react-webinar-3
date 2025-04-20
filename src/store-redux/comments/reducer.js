export const initialState = {
  comments: [],
  loading: false,
  error: null,
  articleId: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { 
        ...state, 
        loading: true,
        error: null,
        articleId: action.payload.articleId
      };

    case 'comments/load-success':
      return { 
        ...state, 
        comments: action.payload.comments,
        loading: false,
        error: null
      };

    case 'comments/load-error':
      return { 
        ...state, 
        comments: [],
        loading: false,
        error: action.payload.error
      };

    case 'comments/addComment-start':
      return { ...state, waiting: true };

    case 'comments/addComment-success':
      return {
        ...state,
        data: { ...state.data, items: [...state.data.items, action.payload.data] },
        waiting: false,
      };

    case 'comments/addComment-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;