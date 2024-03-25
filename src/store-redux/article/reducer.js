import { sortCommentsByHierarchy } from "../../utils/comments-hierarchy";

// Начальное состояние
export const initialState = {
  data: {},
  comments: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return { ...state, data: {}, waiting: true };

    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "article/load-error":
      return { ...state, data: {}, waiting: false, error: action?.payload?.data?.error?.data?.issues[0]?.message || "Error! Try again:(" };
    case "article-comments/load-start":
      return { ...state, comments: {}, waiting: true };

    case "article-comments/load-success":
      return { ...state, comments: { count: action.payload.data.count, items: sortCommentsByHierarchy(action.payload.data.items) }, waiting: false };

    case "article-comments/load-error":
      return { ...state, comments: {}, waiting: false, error: action?.payload?.data?.error?.data?.issues[0]?.message || "Error! Try again:(" };
    case "article-comments/send-start":
      return { ...state, waiting: true };
    case "article-comments/send-success":
      const newComment = { ...action.payload.data.result, author: { profile: { name: 'Вы написали:' } } };
      const newItems = [...state.comments.items, newComment];
      return { ...state, comments: { items: sortCommentsByHierarchy(newItems), count: state.comments.count + 1 }, waiting: false };
    case "article-comments/send-error":
      return { ...state, waiting: false, error: action?.payload?.data?.error?.data?.issues[0]?.message || "Error! Try again:(" };
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
