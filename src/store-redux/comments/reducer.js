import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

export const initialState = {
    count: 0,
    list: []
}


function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, count: 0};
  
      case "comments/load-success":
        
        let data = [
            ...treeToList(listToTree(action.payload.data.items), (item, level) => (
              {id: item._id, date: new Date(item.dateCreate), name: item?.author?.profile?.name, text: item.text, lvl: level}
            ))
        ];
        data.shift();
        return {...state, count: action.payload.data.count, list: data};
  
      case "comments/load-error":
        return {...state, count: 0};
      
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;