// Начальное состояние
const initialState = {
    count: 0,
    data: [],
    id: "", 
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return { ...state, waiting: true};
  
      case "comments/load-success":
        return { ...state, count: action.payload.data.length, data: action.payload.data, waiting: false};
      
        case "comments/load-error":
        return { ...state, waiting: false}; //@todo текст ошибки сохранить?

      case "comments/post-start":
        return { ...state, waiting: true};
  
      case "comments/post-success":
        return { ...state, data: state.data, id: action.payload.id, waiting: false};

      case "comments/post-reply":
        return {...state, data: state.data, waiting: false};
  
      case "comments/post-error":
        return { ...state, waiting: false};
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  