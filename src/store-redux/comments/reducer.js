import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import findComment from "../../utils/find-comment";
import newComments from "../../utils/new-comments";

export const initialState = {
    count: 0,
    list: [],
}


function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, count: 0};
  
      case "comments/load-success":
        
        let data = listToTree(action.payload.data.items)[0].children;
        
        return {...state, count: action.payload.data.count, list: data};

      case "comments/new-comment-start":

        return {...state};

      case "comments/new-comment":
        
        let comment = {...action.payload.data, children: []};
        
        if (action.payload.data.parent._type == 'article') return {...state, count:!state.count ? 1 : state.count + 1, list:!state.list ? [comment] : [...state.list,comment]}

        let parent = findComment(state.list, action.payload.data.parent._id);
    
        if (parent) {
          let newComment = {...parent, children: [...parent.children, {...action.payload.data, children: []}]};
          
          let newList = newComments(state.list, newComment);
          
          return {...state, count: state.count + 1, list: newList};
        }
      
  
      case "comments/load-error":
        return {...state, count: 0, isWaiting: false};
      
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;