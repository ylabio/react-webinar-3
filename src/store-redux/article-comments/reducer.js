const initialState = {
  data: [],
  waiting: false,
  error: null,
  needReload: false // если хотим перезагрузить комменты автоматом, без ф5
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return { ...state, data: [], waiting: true, error: null, needReload: false };

    case 'comments/load-success':
      return { ...state, data: action.payload.data.items, waiting: false };

    case 'comments/load-error':
      return { ...state, waiting: false, error: action.payload.error };

    case 'comments/send':
      return { ...state, waiting: true, error: null };

    case 'comments/send-success':
      return { ...state, data: [...state.data, action.payload.data], waiting: false, needReload: true };

    case 'comments/send-error':
      return { ...state, waiting: false, error: action.payload.error };

    case 'comments/remove':
      return { ...state, waiting: true, error: null };

    case 'comments/remove-success':
      return { ...state, waiting: false, needReload: true };

    case 'comments/remove-error':
      return { ...state, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}