export const initialState = {
    comments: [],
    waiting: false,
    currentArticle: '',
    parentID: '',
    parentType: 'article',
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, comments: [], waiting: true, currentArticle: action.payload.currentArticle, parentType: 'article'};
  
      case "comments/load-success":
        return {...state, comments: action.payload.comments, waiting: false};
  
      case "comments/send-comments-start":
        return {...state, waiting: true};
  
      case "comments/send-comments-success":
        return {...state, comments: [...state.comments, action.payload.newComment], waiting: false, parentID: '', parentType: 'article'};
        
      case "comments/change-parent":
        return {...state, parentType: action.payload.parentType, parentID: action.payload.parentID}
  
      default:
        return state;
    }
  }
  
  export default reducer;