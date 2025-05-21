const initialState = {
  user: {},
  token: null,
  errors: null,
  waiting: true,
  exists: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Здесь должны быть обработчики действий для сессии
    // Например, 'session/sign-in-success', 'session/sign-out' и т.д.
    default:
      return state;
  }
}
