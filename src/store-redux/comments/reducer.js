// Начальное состояние
const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}
  
  // Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true};
  
    case "comments/load-success":
      return { ...state, data: action.payload, waiting: false};
  
    case "comments/load-error":
      return { ...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?
  
    case "comments/post-start":
      return { ...state, waiting: true}

    case "comments/post-success":
      console.log('res',action.payload.result);

      return {
        data: {
          count: state.data.count + 1,
          items: [...state.data.items, action.payload.result]
        }, 
          waiting: false
      }

    case "comments/post-error":
      return { ...state, waiting: false}

    default:
      // Нет изменений
      return state;
    }
  }
  
  export default reducer;
  