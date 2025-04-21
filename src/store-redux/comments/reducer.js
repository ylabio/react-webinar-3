const initialState = {
  items: [], // дерево комментариев
  waiting: false, // загрузка
  creating: false, // отправка
  error: null, // ошибка
  articleId: null, // текущая статья
  activeFormTargetId: null, // id комментария, к которому пишем ответ
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return { ...state, waiting: false, items: action.payload.items };

    case 'comments/load-error':
      return { ...state, waiting: false, error: 'Ошибка загрузки комментариев' };

    case 'comments/create-start':
      return { ...state, creating: true };

    case 'comments/create-success':
      return { ...state, creating: false };

    case 'comments/create-error':
      return { ...state, creating: false, error: action.payload || 'Ошибка создания комментария' };

    case 'comments/set-form-target':
      return { ...state, activeFormTargetId: action.payload };

    case 'comments/reset-form-target':
      return { ...state, activeFormTargetId: null };

    case 'comments/set-article-id':
      return { ...state, articleId: action.payload.articleId };

    default:
      return state;
  }
}
export default reducer;
