const initialState = { 
  comments: [],
  count: 0,
  waiting: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true, error: null };

    case 'comments/load-success':
      const commentsWithReply = action.payload.items.map(comment => ({ ...comment, reply: false }));
      return { ...state, comments: commentsWithReply, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, waiting: false, error: action.payload };

    case 'comments/open-reply':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload.id ? { ...comment, reply: true } : { ...comment, reply: false }
        )
      };

    case 'comments/close-reply':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload.id ? { ...comment, reply: false } : comment
        )
      };

    case 'comments/add-new-start':
      return { ...state, waiting: true, error: null };

    case 'comments/add-new-success':
    //   const { author, dateCreate, text, _id, _type } = action.payload;

    //   console.log(action.payload);

    //   const newComment = {
    //     author,
    //     dateCreate,
    //     text,
    //     _id,
    //     _type,
    //     isDeleted: false,
    //     reply: false
    //   };
      
    //   return {
    //     ...state,
    //     comments: [...state.comments],
    //     count: state.count + 1,
    //     waiting: false
    // };
      return {
        ...state,        
        waiting: false
    };

    case 'comments/add-new-error':
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;