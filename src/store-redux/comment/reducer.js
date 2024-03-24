export const initialState = {
    comments: [],
    count: 0,
    waiting: false,
    error: null
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comment/load-start":
        return { ...state, waiting: true, error: null };
  
      case "comment/load-success":
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
        const { data, user } = action.payload;
        const { _id, text, dateCreate, parent, isDeleted } = data;

        const newComment = {
          _id,
          text,
          dateCreate,
          author: { 
            profile: {
              name: user.profile.name
            },
            _id: user._id
          },
          parent: {
            _id: parent._id,
            _type: parent._type
          },
          isDeleted,
          reply: false 
        };


        const updatedComments = state.comments.map(comment => ({ ...comment, reply: false }));
        updatedComments.push(newComment);

        return {
          ...state,
          comments: updatedComments,
          count: state.count + 1,
          waiting: false
        };

    case 'comments/add-new-error':
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
}
  
export default reducer;
  