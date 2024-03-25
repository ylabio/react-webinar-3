import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};

    case "comments/load-success":
      action.payload.data.items = treeToList(listToTree(action.payload.data.items)[0].children, (item, level) => ({...item, level}));
      return {...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
