export const initialState = {
  data: [],
  waiting: false, // ожидание загрузки
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: [], waiting: false };

    case "comments/post-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/post-error":
      return { ...state, data: [], waiting: false };

    case "comments/getUser-success":
      return { ...state, waiting: false };

    case "comments/getUser-error":
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;
