const initState = {
  comments: [],
  waiting: true,
  commentsLen: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "comments/set":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
