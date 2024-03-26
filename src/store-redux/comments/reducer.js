// Начальное состояние
export const initialState = {
    data: [],
    count : 0,
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, data: [], waiting: true};
  
      case "comments/load-success":
        return {...state, data: action.payload.data,count : action.payload.count, waiting: false};
  
      case "comments/load-error":
        return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

      case "comments/add-reply":
          console.log(action.payload.data)
          return {...state, data: action.payload.data,count : action.payload.count, waiting: false}; 
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  