import listToTree from '../../utils/list-to-tree';

// Начальное состояние
const initialState = {
  list: [],
  commentsTree: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  commentReplyId: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      const comments = action.payload.data.items.filter((i) => !i.isDeleted);

      return {
        ...state,
        commentsTree: listToTree(comments),
        list: comments,
        waiting: false,
        count: comments.length,
      };

    case 'comments/load-error':
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/add-success':
      const comment = action.payload.data;
      const list = [...state.list, comment];
      return {
        ...state,
        commentsTree: listToTree(list),
        list,
        count: state.count + 1,
        waiting: false,
        commentReplyId: null,
      };

    case 'comments/add-error':
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/reply':
      return { ...state, commentReplyId: action.payload.id };

    case 'comments/cancel':
      return { ...state, commentReplyId: null };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
