// Начальное состояние
export const initialState = {
  count: 0,
  items: [],
  result: {},
  success_create: false,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    // Загрузка комментариев
    case "load-comments/load-start":
      return {...state, count: 0, items: [], waiting: true};

    case "load-comments/load-success":
      return {
        ...state, 
        count: action.payload.data.count,
        items:  action.payload.data.items,
        waiting: false
      };

    case "load-comments/load-error":
      return {...state, count: 0, items: [], waiting: false};
    
    // Создание комментария
    case "create-comment/create-start":
      return {...state, result: {}, success_create: false, waiting: true};

    case "create-comment/create-success":
      return {...state, result: action.payload.data, success_create: true, waiting: false};

    case "create-comment/create-error":
      return {...state, result: {}, success_create: false, waiting: false};

    // Добавление комментария
    case "add-comment/add-success":
      return {
        ...state, 
        count: state.count + 1, 
        items: [...state.items, action.payload.data]
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
