// Начальное состояние
export const initialState = {
  data: {items: [], count: 0},
  loadingErrors: null,
  addingErrors: null,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, data: {}, waiting: true};

    case 'comments/load-success':
      return {...state, loadingErrors: null, data: action.payload.data, waiting: false};

    case 'comments/load-error':
      return {...state, data: {}, loadingErrors: action.payload.errors, waiting: false}; //@todo текст ошибки сохранять?

    case 'comments/add-start':
      return {...state, waiting: true};

    case 'comments/add-success':
      return {
        ...state,
        addingErrors: null,
        data: {...state.data, items: [...state.data.items, action.payload.data], count: state.data.count + 1},
        waiting: false,
      };

    case 'comments/add-error':
      return {...state, addingErrors: action.payload.errors, waiting: false}; //@todo текст ошибки сохранять?
    case 'comments/reset-errors':
      return {...state, loadingErrors: null, addingErrors: null};
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
