import listToTree from '../../utils/list-to-tree';

const initialState = {
  items: [],
  tree: [],
  waiting: false,
  creating: false,
  errors: null,
  currentUserId: null
};

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, waiting: true, errors: null };

    case 'comments/load-success':
      return {
        ...state,
        waiting: false,
        items: action.payload,
        tree: listToTree(action.payload, 'article')
      };

    case 'comments/load-error':
      return { ...state, waiting: false, errors: action.payload };

    case 'comments/create-start':
      return { ...state, creating: true };

    case 'comments/create-success': {
      const { comment } = action.payload;
      const newItems = [...state.items, comment];
      
      return {
        ...state,
        creating: false,
        items: newItems,
        tree: listToTree(newItems, 'article')
      };
    }

    case 'comments/create-error':
      return { ...state, creating: false, errors: action.payload };

    case 'comments/set-current-user':
      return {
        ...state,
        currentUserId: action.payload
      };

    default:
      return state;
  }
}

export default commentsReducer;
