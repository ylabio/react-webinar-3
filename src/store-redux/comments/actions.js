export default {
  load: () => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  send: () => {
    
  }
}