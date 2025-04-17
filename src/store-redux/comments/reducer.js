export const initialState = {
  data: {
    items: [],
    count: 0,
  },
  waiting: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: { items: [] }, waiting: true };

    case 'comments/load-success':
      const items = action.payload.data.items || [];
      return {
        ...state,
        data: {
          items,
          count: items.length,
        },
        waiting: false,
        error: null,
      };

    case 'comments/load-error':
      return {
        ...state,
        data: { items: [], count: 0 },
        waiting: false,
        error: 'Ошибка загрузки комментариев',
      };

    case 'comments/create-start':
      return { ...state, waiting: true, error: null };

    case 'comments/create-success':
      return {
        ...state,
        data: {
          items: [...state.data.items, action.payload],
          count: state.data.count + 1,
        },
        waiting: false,
        error: null,
      };

    case 'comments/create-error':
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
}

export default reducer;
