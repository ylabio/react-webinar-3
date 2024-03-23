export const initialState = {
  list: [],
  count: 0,
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, list: [], count: 0, waiting: true };

    case "comments/load-success":
      return { ...state, list: action.payload.data.items, count: action.payload.data.count, waiting: false }

    case "comments/load-error":
      return { ...state, list: [], count: 0, waiting: false }

    default:
      return state;
  }
}

export default reducer;