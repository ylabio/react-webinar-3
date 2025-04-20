import { listToTree } from '../../utils/listToTree';

const initialState = {
  items: [],
  tree: [],
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      console.log('Reducer received load success:', action.payload);
      const items = action.payload.data || [];
      const tree = listToTree(items, 'article');
      return {
        ...state,
        items,
        tree,
        waiting: false,
      };

    case 'comments/add-success':
      const newItems = [...state.items, action.payload.comment];
      const newTree = listToTree(newItems, 'article');
      return {
        ...state,
        items: newItems,
        tree: newTree,
        waiting: false,
      };

    case 'comments/load-error':
    case 'comments/add-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}
