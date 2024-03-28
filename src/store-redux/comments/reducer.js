// Начальное состояние
export const initialState = {
    list: {},
    comWaiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, list: {}, comWaiting: true};
  
      case "comments/load-success":
        return {...state, list: action.payload.data, comWaiting: false};
  
      case "comments/load-error":
        return {...state, list: {}, comWaiting: false, error: action.payload.data}; //@todo текст ошибки сохранять?
       
        
      case "comment/load-start":
        return {...state, comWaiting: true};

      case "comment/load-success":
        return {...state, waiting: false};
    
      case "comment/load-error":
        return {...state, waiting: false, error: action.payload.data};
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;