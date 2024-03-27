export const initialState = {
  data: [],
  count: 0,
  waiting: false,
  error: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], count: 0, waiting: true, error: null};

    case "comments/load-success":
      return {...state, data: action.payload.data, count: action.payload.count, waiting: false, error: null};

    case "comments/load-error":
      return {...state, data: [], count: 0, waiting: false, error: action.payload}; //@todo текст ошибки сохранять?

    case 'comments/create-comment':
      return {
        ...state,
        data: [...state.data, action.payload],
        count: state.count + 1
      }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;