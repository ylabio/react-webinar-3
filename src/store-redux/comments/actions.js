export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'})

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${_id}`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  sendComment: (data, token) => {
    return async (dispatch, getState, services) => {

      dispatch({type: 'comments/send-start'})

      try {
        const res = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)`,
          headers: {
            'X-Token': token
          },
          body: JSON.stringify(data)
        });
        dispatch({type: 'comments/send-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/send-error'});
      }
    }
  },

  sendReply: (data, token) => {
    return async (dispatch, getState, services) => {

      dispatch({type: 'comments/send-reply-start'})

      try {
        const res = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)`,
          headers: {
            'X-Token': token
          },
          body: JSON.stringify(data)
        });
        dispatch({type: 'comments/send-reply-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/send-reply-error'});
      }
    }
  }
}