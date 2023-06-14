import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

// Начальное состояние
const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/create-start":
      return { ...state, waiting: true };

    case "comments/create-success":
      return { ...state,  data: {...state.data, items: [...state.data.items, action.payload.data]}, waiting: false };

    case "comments/create-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
