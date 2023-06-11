export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,dateCreate,author(username),parent(_id, _tree), text)`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  send: (id, text, type) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/send-start'});

      const body = {
        parent: {
          _id: id,
          _type: type
        },
        text,
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(body)
        });
        dispatch({type: 'comments/send-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/send-error'});
      }
    }
  },
}
