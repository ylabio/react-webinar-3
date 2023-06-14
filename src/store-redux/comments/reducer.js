// Начальное состояние
const initialState = {
  data: [],
  chosenComment: null,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false, chosenComment: null};
    
    case "comments/chose-comment":
      return { ...state, chosenComment: action.payload};

    case "comments/add-comment":
      return { ...state, data: [...state.data, action.payload]};

    case "comments/load-error":
      return { ...state, data: [], waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
