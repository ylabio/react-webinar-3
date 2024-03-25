// Начальное состояние
export const initialState = {
  data: {},
  // waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return {...state, data: {}};

    case "article-comments/load-success":
      return {...state, data: action.payload.data};

    case "article-comments/load-error":
      return {...state, data: {}}; //@todo текст ошибки сохранять?

    case "article-comments/addComment": 
      return {...state, data: {
        count: state.data.count + 1, 
        items: [...state.data.items, action.payload.newComment]}}

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
