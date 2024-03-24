const actionTypes = {
  LOAD_START: "comments/load-start",
  LOAD_SUCCESS: "comments/load-success",
  LOAD_ERROR: "comments/load-error",
  OPEN_REPLY: "comments/open-reply",
  CLOSE_REPLY: "comments/close-reply",
  ADD_NEW_START: "comments/add-new-start",
  ADD_NEW_SUCCESS: "comments/add-new-success",
  ADD_NEW_ERROR: "comments/add-new-error",
};

const initialState = {
  comments: [],
  count: 0,
  waiting: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return { ...state, waiting: true, error: null };

    case actionTypes.LOAD_SUCCESS:
      const commentsWithReply = action.payload.items.map((comment) => ({
        ...comment,
        reply: false,
      }));
      return {
        ...state,
        comments: commentsWithReply,
        count: action.payload.count,
        waiting: false,
      };

    case actionTypes.LOAD_ERROR:
      return { ...state, waiting: false, error: action.payload };

    case actionTypes.OPEN_REPLY:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.id
            ? { ...comment, reply: true }
            : { ...comment, reply: false }
        ),
      };

    case actionTypes.CLOSE_REPLY:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.id
            ? { ...comment, reply: false }
            : comment
        ),
      };

    case actionTypes.ADD_NEW_START:
      return { ...state, waiting: true, error: null };

    case actionTypes.ADD_NEW_SUCCESS:
      return {
        ...state,
        waiting: false,
      };

    case actionTypes.ADD_NEW_ERROR:
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
