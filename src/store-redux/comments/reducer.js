// Начальное состояние
export const initialState = {
    data: {
        count: 0,
        items: [{
          _id: '',
          author: {
            profile: {
              name: ""
            }
          },
          text: ''
        }]
    },
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, data: {}, waiting: true};
  
      case "comments/load-success":
        return {...state, data: action.payload.data, waiting: false};
  
      case "comments/load-error":
        return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

      case "comments/add-new":
        const newData = {
          count: state.data.count + 1,
          items: [...state.data.items, action.payload]
        }
        return {...state, waiting: false, data: {...state.data, ...newData}};
      case 'comments/add-new-error':
        return {...state, waiting: false, data: {}}
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;