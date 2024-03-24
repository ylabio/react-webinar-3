// Начальное состояние
export const initialState = {
  data: [],
  waiting: false,
  waitingAdd: false,
  count: 0,
  typeComments: "article",
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        data: action.payload.data,
        waiting: false,
        count: action.payload.count,
      };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };
    case "comments/add-start":
      return { ...state, waitingAdd: true };

    case "comments/add-success":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        count: state.count + 1,
        waitingAdd: false,
      };

    case "comments/add-error":
      return { ...state, waitingAdd: false };

    case "comments/setTypeComments":
      return { ...state, typeComments: action.payload.type };
    default:
      return state;
  }
}

export default reducer;
