export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name, _id)),parent(_id,_type)),count`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  setAnswer: (id, type) => {
    return {type: 'comments/set-answer', payload: {id, type}}
  },

  sendComment: (text, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/send-start'});
      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=*,_id,text,dateCreate,author(profile(name))',
          method: 'POST',
          body: JSON.stringify({text, parent: {_id: id, _type: type}})
        })

        dispatch({type: 'comments/send-success', payload: {data: res.data.result}})
      } catch (error) {
        dispatch({type: 'comments/send-error'})
      }
    }
  }
}
