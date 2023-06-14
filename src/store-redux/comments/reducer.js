const initialState = {
    comments: [],
    waiting: false,
    count: 0,
    answerId: "",
    errors: null
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return { ...state, waiting: true};
  
      case "comments/load-success":
        return { ...state, comments: action.payload.comments, waiting: false, count: action.payload.count};
  
      case "comments/load-error":
        return { ...state, comments: [], waiting: false, errors: action.payload.errors}; //@todo текст ошибки сохранить?

      case "comments/setAnswerId":
        return { ...state, answerId: action.payload.answerId};

      case "comments/send-success":
        console.log(action.payload.comments)
        return { ...state, comments: [...state.comments, {...action.payload.comments}], count: state.count + 1, waiting: false};
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  