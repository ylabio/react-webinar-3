// Начальное состояние
const initialState = {
  name: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'textarea/open':
      return {...state, name: action.payload.name};
    case 'textarea/close':
      return {...state, name: null};
    default:
      return state;
  }
}

export default reducer;
