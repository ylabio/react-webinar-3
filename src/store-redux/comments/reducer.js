
export const initialState = {
  data: [],
  waiting: false, // ожидание загрузки
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: [], waiting: false };

    case 'comments/add-new-start':
      return { ...state, waiting: true, error: null };

    case 'comments/open-reply':
      return {
        ...state,
        data: state.data.map(comment =>
          comment._id === action.payload.id ? { ...comment, reply: true } : { ...comment, reply: false }
        )
      };

    case 'comments/close-reply':
      return {
        ...state,
        data: state.data.map(comment =>
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


      const updatedComments = state.data.map(comment => ({ ...comment, reply: false }));
      updatedComments.push(newComment);

      return {
        ...state,
        data: updatedComments,
        waiting: false
      };

    case 'comments/add-new-error':
      return { ...state, waiting: false, error: action.payload };

    default:
      return state;
  }
}

export default reducer;
