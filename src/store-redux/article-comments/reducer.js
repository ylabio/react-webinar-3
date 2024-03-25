// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  formId: "",
  post: "",
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "articleComments/add-comment":
      return { ...state, data: [...state.data, action.payload.data] };

    case "articleComments/post-success":
      return { ...state, post: "success" };

    case "articleComments/post-clear":
      return { ...state, post: "" };

    case "articleComments/load-start":
      return { ...state, data: [], count: 0, waiting: true };

    case "articleComments/load-success":
      return {
        ...state,
        data: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
      };

    case "articleComments/load-error":
      return { ...state, data: [], count: 0, waiting: false }; //@todo текст ошибки сохранять?

    case "articleComments/setFormId":
      return { ...state, formId: action.payload.id };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
