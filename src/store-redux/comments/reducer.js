const initialState = {
  comments: {
    items: [],
    count: 0
  },
  answer: {
    id: '',
    type: 'article'
  },
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: initialState.comments, waiting: true};

    case "comments/load-success":
      return { ...state, comments: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, comments: initialState.comments, waiting: false};

    case "comments/set-answer":
      return {...state, answer: action.payload };

    case "comments/send-start":
      return {...state, waiting: true };

    case "comments/send-success":
      return {...state, comments: {items: [...state.comments.items, action.payload.data], count: state.comments.count + 1}, waiting: false };

    case "comments/send-error":
      return {...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
