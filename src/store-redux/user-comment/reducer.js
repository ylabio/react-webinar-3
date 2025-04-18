export const initialState = {
  userComment: '',
  userId: '',
  userToken: '',
  parent: {
    _id: '',
    _type: 'article',
  },
  lastIdFromCommentTree: '',
  waiting: false,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'user-comment/update-user-log-data':
      return {
        ...state,
        userId: action.payload.userId,
        userToken: action.payload.userToken,
        parent: {
          ...state.parent,
          _id: action.payload.parentId,
        },
      };
    case 'user-comment/update-comment-ids':
      return {
        ...state,
        parent: {
          ...state.parent,
          _id: action.payload._id,
          _type: action.payload._type,
        },
        lastIdFromCommentTree: action.payload.lastId,
      };
    case 'user-comment/upload-comment':
      return {
        ...state,
        userComment: action.payload.text,
      };
    case 'user-comment/load-start':
      return {
        ...state,
        waiting: true,
      };
    case 'user-comment/load-success':
      return {
        ...state,
        waiting: false,
      };
    case 'user-comment/reset':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default reducer;
