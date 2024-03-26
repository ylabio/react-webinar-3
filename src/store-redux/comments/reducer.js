export const initialState = {
  data: {},
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, waiting: true};
    case 'comments/load-success':
      return {...state, data: action.payload.data, waiting: false};
    case 'comments/load-error':
      return {...state, data: {}, waiting: false} //@todo текст ошибки сохранять?
    case 'comments/send-success':
      return {
        ...state,
        waiting: false,
        data: {
          items: [
            ...state.data.items,
            { ...action.payload.data,
              author: action.payload.author
            }
          ],
          count: state.data.count + 1
        }
      }

    default:
      return state;
  }
}

export default reducer;