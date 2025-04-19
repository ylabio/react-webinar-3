const initialState = {
    items: [],
    waiting: false,
    creating: false,
    errors: null
  };
  
  function buildCommentsTree(comments, parentId = null, depth = 0) {
    return comments
      .filter(comment =>
        (!parentId && comment.parent._type === 'article') ||
        (comment.parent._id === parentId && comment.parent._type === 'comment')
      )
      .map(comment => ({
        ...comment,
        depth,
        replies: buildCommentsTree(comments, comment._id, depth + 1)
      }));
  }

  export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
      case 'comments/load-start':
        return { ...state, waiting: true, errors: null };

      case 'comments/load-success':
        return {
          ...state,
          waiting: false,
          items: buildCommentsTree(action.payload)
        };

      case 'comments/load-error':
        return { ...state, waiting: false, errors: action.payload };

      case 'comments/create-start':
        return { ...state, creating: true };

      case 'comments/create-success':
        return {
          ...state,
          creating: false,
          items: buildCommentsTree([...state.items, action.payload])
        };

      case 'comments/create-error':
        return { ...state, creating: false, errors: action.payload };

      default:
        return state;
    }
  }
