// Начальное состояние
export const initialState = {
  data: {},
  login: false,
  _id: '',
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return {...state, data: {}, waiting: true};

    case "article-comments/load-success":
      return {...state, data: action.payload.data, scrollY: action.payload.scrollY, waiting: false};

    case "article-comments/login":
      return {...state, login: action.payload.login, _id: action.payload._id};

    case "article-comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?
    
    case "article-comments/login-error":
      return {...state, data: {}, waiting: false};

    case "article-comments/loadComment-start":
      return {...state, waiting: true};
  
    case "article-comments/loadComment-success":
      let data = {...state.data};
      data.items.push({...action.payload.data, author: {profile: {name: action.payload.user}}});
      data.count++;
      console.log(action.payload.data);
      return {...state, waiting: false, data: data };
  
    case "article-comments/loadComment-error":
      return {...state, data: {}, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
