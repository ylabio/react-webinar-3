const initialState = {
  items: [], // Переименуем data в items для согласованности
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.data?.items || [], // Учитываем структуру ответа
        waiting: false,
      };

    case 'comments/add-success':
      return {
        ...state,
        items: [...state.items, action.payload.comment],
        waiting: false,
      };

    case 'comments/load-error':
    case 'comments/add-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}
