export const initialState = {
  data: [],
  waiting: false,
  count: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, data: [...state.data], waiting: true};
    case 'comments/load-success':
      return {...state, data: action.payload.data.items, waiting: false, count: action.payload.data.count};
    case 'one-comment/load-success':
      return {...state, data: action.payload.data.items, waiting: false, count: action.payload.data.count};
    case 'comments/load-error':
      return {...state, data: [], waiting: false}
    default:
      return state;
  }
}

export default reducer;