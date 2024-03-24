// Начальное состояние
export const initialState = {
  data: {
    items: [],
    count: 0,
  },
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: initialState.data, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: initialState.data, waiting: false }; //@todo текст ошибки сохранять?

    case "comments/add-success":
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload.data],
          count: state.data.count + 1,
        },
      };

    case "comments/add-error":
      return state;

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
