// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'texts/load-start':
      return { ...state, data: {}, waiting: true };

    case 'texts/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'texts/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'texts/send-success':
      return {
        ...state,
        waiting: true,
      };
      case 'texts/create-success':
      return {
        ...state,
        data: { ...state.data, items: [...state.data.items, action.payload.data], count: state.data.count + 1 },
        waiting: false,
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
