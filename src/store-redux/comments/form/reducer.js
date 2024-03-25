// Начальное состояние
export const initialState = {
  idComment: '',
  newComment: {}
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case "comments/form/open":
      return {...state, idComment: action.payload.idComment};

    case "comments/form/close":
      return {...state, idComment: ''};

    case "comments/form/onSubmit/load-success":
      return {...state, idComment: ''};

    case "comments/form/onSubmit/new-comment":
      return {...state, newComment: action.payload.data};  

    case "comments/load-error":
      return {...state}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;