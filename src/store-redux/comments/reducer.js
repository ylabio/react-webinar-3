// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false};

    case "comments/send-start":
      return {...state, waiting: true};

    case "comments/send-success":
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload.data]
        },
        waiting: false
      };

    case "comments/send-error":
      return {...state, data: {}, waiting: false};


    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
