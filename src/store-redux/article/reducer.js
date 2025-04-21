export const initialState = {
  data: {}, // данные о товаре
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'article/load-start':
      return { ...state, waiting: true, data: {} };

    case 'article/load-success':
      return { ...state, waiting: false, data: action.payload.data };

    case 'article/load-error':
      return { ...state, waiting: false }; // можно добавить error, если нужно

    default:
      return state;
  }
}

export default reducer;
