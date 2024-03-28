// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
  newCommentId:''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};

    case "comments/add-success":
      return {...state, data: [...state.data, action.payload], waiting: false, newCommentId:action.payload._id};

    case "comments/add-error":
      return {...state, waiting: false};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: [], waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
