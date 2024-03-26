export const initialState = {
  data: {},
  postData: {},
  waiting: false,
  waitingAfterPost: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false};

    case "comments/post-start":
      return {...state, postData: {}, waitingAfterPost: true};

    case "comments/post-success":
      return {...state, postData: action.payload.data, waitingAfterPost: false};

    case "comments/post-error":
      return {...state, postData: {}, waitingAfterPost: false};

    default:
      return state;
  }
}

export default reducer;
