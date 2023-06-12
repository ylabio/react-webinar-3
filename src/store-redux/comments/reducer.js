// Начальное состояние
const initialState = {
  comments: [],
  count: 0,
  status: '',
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case "comments/load-start":
      return { ...state, 
        comments: [], 
        count:0,
        status: '', 
        waiting: true};

    case "comments/load-success":
      return { ...state, 
        comments: action.payload.data.items,
        count: action.payload.data.count,
        status: 'success', 
        waiting: false};

    case "comments/load-error":
      return { ...state, 
        comments: [],
        status: 'error', 
        waiting: false}; //@todo текст ошибки сохранить?

    case "comments/comment-load-start":
      return { ...state, 
        status: '', 
        waiting: true};    

    case "comments/add-comment":
      return { ...state, 
        comments: [...state.comments, action.payload.data],
        status: 'success',  
        waiting: false}; 

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
