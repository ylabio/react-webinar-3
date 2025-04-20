const initialState = {
  user: null,
  token: null,
  exists: false,
  waiting: true,
  errors: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'session/remind':
    case 'session/sign-in-start':
      return { ...state, waiting: true, errors: null };

    case 'session/set':
      return { ...state, ...action.payload };

    case 'session/sign-in-error':
      return {
        ...state,
        waiting: false,
        errors: action.payload?.errors || null
      };

    case 'session/clear':
      return { ...initialState, waiting: false };

    case 'session/reset-errors':
      return { ...state, errors: null };

    default:
      return state;
  }
}
