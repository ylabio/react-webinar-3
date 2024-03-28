// Начальное состояние
export const initialState = {
  data: {},
  waiting: false,
  errors: null,
  selectedComment: null,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false };

    case 'comments/selectComment':
      return {...state, selectedComment: action.payload}

    case 'comments/unselectComment':
      return {...state, selectedComment: null}

    case 'comments/add-start' :
      return {...state, waiting: true}
    case 'comments/add-success' :
      return {
        ...state,
        waiting: false,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload.newComment],
          count: state.data.count + 1
        }
      };
    case 'comments/add-error' :
      return  {...state, waiting: false};
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
