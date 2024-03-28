import { sortCommentsByHierarchy } from "../../utils/comments-hierarchy";

// Начальное состояние
export const initialState = {
  items: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return { ...state, items: {}, waiting: true };

    case "article-comments/load-success":
      return { ...state, items: { count: action.payload.data.count, items: sortCommentsByHierarchy(action.payload.data.items) }, waiting: false };

    case "article-comments/load-error":
      return { ...state, items: {}, waiting: false, error: action?.payload?.data?.error?.data?.issues[0]?.message || "Error! Try again:(" };
    case "article-comments/send-start":
      return { ...state, waiting: true };
    case "article-comments/send-success":
      const newComment = { ...action.payload.data.result, author: { profile: { authorName: action.payload.name } } };
      const newItems = [...state.items.items, newComment];
      return { ...state, items: { items: sortCommentsByHierarchy(newItems), count: state.items.count + 1 }, waiting: false };
    case "article-comments/send-error":
      return { ...state, waiting: false, error: action?.payload?.data?.error?.data?.issues[0]?.message || "Error! Try again:(" };
    default:
      // Нет изменений
      return state;

  }
}

export default reducer;
