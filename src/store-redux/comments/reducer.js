export const initialState = {
  list: [],
  count: 0,
  waiting: false
}

function reducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case "comments/load-start":
      return { ...state, list: [], count: 0, waiting: true };

    case "comments/load-success":
      return { ...state, list: action.payload.data.items, count: action.payload.data.count, waiting: false };

    case "comments/load-error":
      return { ...state, list: [], count: 0, waiting: false };

    case "comments/send-start":
      return { ...state, waiting: true };

    case "comments/send-success": {
      console.log(action.payload.data);
      return { ...state, list: [...state.list, action.payload.data], count: state.count + 1, waiting: false }
    }

    case "comments/send-error":
      return { ...state, waiting: false }

    default:
      return state;
  }
}

export default reducer;