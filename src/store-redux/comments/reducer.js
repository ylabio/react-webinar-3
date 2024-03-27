import comment from "../../components/comment";

// Начальное состояние
export const initialState = {
  commentId: null,
  newComment: null,
  data: {},
  waiting: false, // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/send-start":
      return {...state, waiting: true};

    case "comments/send-success":
      return {...state, data: state.data.concat(action.payload.data), newComment: action.payload.data._id,
        waiting: false};

    case "comments/send-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?
    
    case "comments/set-comment-id":
      return {...state, commentId: action.payload.data};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
