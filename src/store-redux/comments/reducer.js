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
        return {...state, list: {}, comWaiting: false}; //@todo текст ошибки сохранять?
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;