export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: "comments/load-error"});
      }
    }
  },

  send: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/send-start'});

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text: text,
            parent: parent
          })
        });

        dispatch({type: 'comments/send-success', payload: {data: res.data.result}})
      } catch (e) {
        console.log(e);
        dispatch({type: 'comments/send-error'})
      }
    }
  }
}