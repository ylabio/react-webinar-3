// Начальное состояние
export const initialState = {
  data: [],
  count: null,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        data: action.payload.data.map((item) => ({
          ...item,
          openReply: false,
        })),
        count: action.payload.count,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранять?

    case "comments/open-reply":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, openReply: true };
          }
          return item.openReply ? { ...item, openReply: false } : item;
        }),
      };

    case "comments/close-reply":
      return {
        ...state,
        data: state.data.map((item) => {
          return item.openReply ? { ...item, openReply: false } : item;
        }),
      };

    case "comments/send-start":
      return { ...state, waiting: true };

    case "comments/send-success":
      return {
        ...state,
        waiting: false,
        data: [
          ...state.data,
          {
            ...action.payload.newComment,
            openReply: false,
            author: { profile: { name: action.payload.userName } },
          },
        ],
        // data: { ...action.payload.newComment, openReply: false },
        count: state.count + 1,
      };

    case "comments/send-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
