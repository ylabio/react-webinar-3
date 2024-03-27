// Начальное состояние
export const initialState = {
  data: {
    items: [],
    count: 0
  },
  currentId: null,
  waiting: false, // признак ожидания загрузки
  errorMessages: []
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: { items: [], count: 0 }, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: { items: [], count: 0 }, errorMessages: '1', waiting: false };

    case "comments/set-current":
      return { ...state, currentId: action.payload.data };

    case "comments/remove-current":
      return { ...state, currentId: null };

    case "comments/send-success":
      return { ...state, currentId: null, data: { items: [...state.data.items, action.payload.data], count: state.data.count + 1 } }

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
