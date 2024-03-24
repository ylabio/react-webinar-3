// Начальное состояние
export const initialState = {
  data: {},
  waiting: false,
  success: false,
  error: "", // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "new-comment/send-start":
      return { ...state, success: false, waiting: true, data: {} };

    case "new-comment/send-success":
      return {
        ...state,
        waiting: false,
        success: action.payload.success,
        data: action.payload.data,
      };

    case "new-comment/send-error":
      return { ...state, data: {}, waiting: false, success: false, error: "" }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
