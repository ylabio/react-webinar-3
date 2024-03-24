export const initialState = {
  active: '',
  article: '',
  comment: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comment-replier/set-active':
      return {
        ...state,
        active: action.payload === 'article' ? state.article : state.comment
      }

    case 'comment-replier/set-article':
      return {
        ...state,
        article: action.payload,
        active: action.payload
      }

    case 'comment-replier/set-comment':
      return {
        ...state,
        comment: action.payload,
        active: action.payload,
      }

    default:
      return state
  }
}

export default reducer