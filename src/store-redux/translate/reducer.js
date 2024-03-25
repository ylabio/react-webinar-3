// Начальное состояние
const initialState = {
 language: 'ru'
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case 'translate/change-language':
      return {...state, language: action.payload.language};
    default:
      return state;
  }
}

export default reducer;
