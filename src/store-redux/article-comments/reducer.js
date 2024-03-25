// Начальное состояние
export const initialState = {
  data: {},
  scrollY: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return {...state, data: {}, waiting: true};

    case "article-comments/load-success":
      return {...state, data: action.payload.data, scrollY: action.payload.scrollY, waiting: false};

    case "article-comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
