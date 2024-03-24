export const initialState = {
  data: {},
  waiting: false,
  error: null
}

function reducer(state = initialState, action) {

  switch (action.type) {

    case 'create-comment/load-start':
      return {
        ...state,
        data: {},
        waiting: true,
        error: null
      }

    case 'create-comment/load-success':
      return {
        ...state,
        data: action.payload,
        waiting: false,
      }

    case 'create-comment/load-error':
      return {
        ...state,
        data: {},
        waiting: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer