const initialState = {
  items: [],
  waiting: false,
};

function buildCommentTree(comments) {
  const map = {};
  const roots = [];
  
  comments.forEach(comment => {
    map[comment._id] = { ...comment, children: [] };
  });
  
  comments.forEach(comment => {
    if (comment.parent?._id && map[comment.parent._id]) {
      map[comment.parent._id].children.push(map[comment._id]);
    } else {
      roots.push(map[comment._id]);
    }
  });
  
  return roots;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, items: [], waiting: true };

    case 'comments/load-success':
      const validComments = action.payload.filter(comment => !comment.isDeleted);
      return { 
        ...state, 
        items: buildCommentTree(validComments),
        waiting: false 
      };

    case 'comments/load-error':
      return { ...state, items: [], waiting: false };

    default:
      return state;
  }
}

export default reducer;