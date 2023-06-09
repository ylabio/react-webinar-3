const initState = {
  comments: [],
  waiting: true,
  commentsLen: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "comments/set":
      return { ...state, ...action.payload };
    case "comments/addComment":
      const comments = [...state.comments, action.payload];
      return {
        ...state,
        commentsLen: comments.length,
        comments,
      };
    default:
      return state;
  }
};
