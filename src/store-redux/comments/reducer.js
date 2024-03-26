// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, waiting: true};

    case "comments/load-success":

      return {...state, data: action.payload.data.items, waiting: false};

    case "comments/load-error":
      return {...state, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/add-success":
      const newComment = action.payload;
      const newData = [...state.data, newComment];
      return {...state, data: newData};
    case "comments/add-error":
      return {...state, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/add-answer-success":
      const newAnswer = action.payload;
      const answer = [...state.data, newAnswer];
      return {...state, data: answer};

    case "comments/add-answer-error":
      return {...state, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
