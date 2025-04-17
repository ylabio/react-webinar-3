// Начальное состояние
export const initialState = {
  data: {
    count: 0,
    items: []
  },
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {count: 0,
        items: []}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: {count: action.payload.data.count, items: action.payload.data.items}, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?
    
    case 'comments/create-start':
      return { ...state, waiting: true}

    case 'comments/create-success':
      return { ...state, waiting: false}

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
