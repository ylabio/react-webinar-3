export const initialState = {
  items: [],
  count: 0,
  waiting: false,
  waitingPost: false,
  typeComment: 'article'
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, items: [], count: 0, waiting: true};

    case "comments/load-success":
      return {...state, items: action.payload.items, count: action.payload.count, waiting: false};

    case "comments/load-error":
      return {...state, items: [], count: 0, waiting: false};

    case "post-comment/post-start":
      return {...state, waitingPost: true, isPosted: false};

    case "post-comment/post-success":
      return {...state, items: [...state.items, action.payload.items], waitingPost: false, isPosted: true};

    case "post-comment/post-error":
      return {...state, waitingPost: false};

    case "comments/setTypeComment":
      return {...state, typeComment: action.payload.type}


    default:
      return state;
  }
}

export default reducer;