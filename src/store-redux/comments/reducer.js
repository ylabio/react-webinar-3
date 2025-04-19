const initialState = {
  items: [],
  count: 0,
  waiting: false,
  replyTo: null, // id комментария, на который отвечаем
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.items,
        count: action.payload.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, error: action.payload, waiting: false };

    case 'comments/set-reply':
      return { ...state, replyTo: action.payload };

    case 'comments/add-success':
      return {
        ...state,
        items: [action.payload, ...state.items],
        count: state.count + 1,
        replyTo: null,
      };

    default:
      return state;
  }
}
