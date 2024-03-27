// Начальное состояние
const initialState = {
  name: '',
  textarea: 'textarea'
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'modal/open':
      return {...state, name: action.payload.name};
    case 'modal/close':
      return {...state, name: null};
    case 'modal/openTextArea':
      return {...state, textarea: action.payload.name};
    case 'modal/closeTextArea':
      return {...state, textarea: 'textarea'};
    default:
      return state;
  }
}

export default reducer;
