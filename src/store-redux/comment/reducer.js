import findCommentById from "../../utils/findCommentById";
import listToTree from "../../utils/list-to-tree";
import updateCommentInNestedItems from "../../utils/updateCommentInNestedItems";

// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// const { user } = useSelector(state => ({
//   user: state.session.user
// }))

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load-start":
      return { ...state, data: {}, waiting: true };

    case "comment/load-success":
      return {
        ...state,
        data: {
          count: action.payload.data.count,
          items: listToTree(action.payload.data.items)[0].children
        },
        waiting: false
      };

    case "comment/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case "comment/submit-start":
      return { ...state, waiting: true };

    case "comment/submit-success":
      const new_comment = { ...action.payload.data, children: [] };
      if (action.payload.data.parent._type === 'article') {
        return {
          ...state,
          data: {
            count: !state.data.count ? 1 : state.data.count + 1,
            items: !state.data.items ? [
              new_comment
            ] : [
              ...state.data.items,
              new_comment
            ]
          }, waiting: false
        };
      }
      const parentComment = findCommentById(state.data.items, action.payload.data.parent._id);
      if (parentComment) {
        const updatedComment = {
          ...parentComment,
          children: [...parentComment.children, {
            ...action.payload.data,
            children: []
          }]
        };
        const updatedItems = updateCommentInNestedItems(state.data.items, updatedComment);
        return {
          ...state,
          data: {
            count: state.data.count + 1,
            items: updatedItems
          },
          waiting: false
        };
      }

    case "comment/submit-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
