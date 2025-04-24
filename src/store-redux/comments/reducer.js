// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  count: {},
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, count: {}, waiting: true };

    case 'comments/load-success': 
      return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, count: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/create-start':
      return { ...state, waiting: true, success: true };

    case 'comments/create-success':
      console.log('Успешная отправка сообщения');
      return { ...state, data: action.payload.data, waiting: false, success: true }
    
    case 'comments/create-error':
      return { ...state, waiting: false, success: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
