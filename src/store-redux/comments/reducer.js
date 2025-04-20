export const initialState = {
  items: {},
  counts: {}, // { [parentId]: количество }
  loadingParents: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      console.log('Loaded start:');
      return {
        ...state,
        loadingParents: [...state.loadingParents, action.payload.parentId]
      };

      case 'comments/load-success':
        if (!Array.isArray(action.payload.items)) {
          console.error('Invalid items in payload:', action.payload);
          return state;
        }

        return {
          ...state,
          items: {
            ...state.items,
            [action.payload.parentId]: action.payload.items.filter(
              comment => comment?._id && comment?.text
            ) // Фильтрация некорректных данных
          },
          counts: {
            ...state.counts,
            [action.payload.parentId]: Number(action.payload.count) || 0
          },
          loadingParents: state.loadingParents.filter(id => id !== action.payload.parentId)
        };

    case 'comments/add':
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.parentId]: [
            ...(state.items[action.payload.parentId] || []),
            action.payload.comment
          ]
        },
        counts: {
          ...state.counts,
          [action.payload.parentId]: (state.counts[action.payload.parentId] || 0) + 1
        }
      };

    default:
      return state;
  }
}
