export const initialState = {
  data: { items: [], count: 0 },
  waiting: true,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false, error: action.payload.data };

    case 'comments/create-start':
      return { ...state, waiting: true };

    case 'comments/create-success':
      const newComment = action.payload.data;

      if (action.payload.data.parent._type !== 'comment') {
        const updatedItems = [...state.data.items, newComment];

        return {
          ...state,
          data: {
            ...state.data,
            items: updatedItems,
          },
          waiting: false,
          error: null,
        };
      } else {
        const parentId = newComment.parent._id;
        const items = state.data.items.map(item => {
          if (item._id === parentId) {
            return {
              ...item,
              children: [...item.children, newComment],
            };
          }
          return item;
        });

        return {
          ...state,
          data: {
            ...state.data,
            items: [...items, newComment],
          },
          waiting: false,
          error: null,
        };
      }

    case 'comments/create-error':
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
}

export default reducer;
