// Начальное состояние
export const initialState = {
  comments: [],
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        comments: action.payload.comments,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
