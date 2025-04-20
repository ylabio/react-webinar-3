const initialState = {
  items: [],
  count: '0',
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
      return { ...state, items: [], count: '0', waiting: true };

    case 'comments/load-success':
      const validComments = action.payload.items.filter(comment => !comment.isDeleted);
      return { 
        ...state, 
        items: buildCommentTree(validComments),
        count: action.payload.count,
        waiting: false 
      };

    case 'comments/load-error':
      return { ...state, items: [], count: '0', waiting: false };

    default:
      return state;
  }
}

export default reducer;