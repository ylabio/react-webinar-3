// Начальное состояние
export const initialState = {
  place: 'common',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'commentForm/changePlace':
      return { ...state, place: action.payload.place };
    case 'commentForm/reset':
      return {...initialState};
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
