export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=*,author(profile)`
        });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    }
  },
  addComment: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/add-start' });
      const token = localStorage.getItem('token');
      const opt = {
        text: text,
        parent: parent,
      }
      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=*,author(profile)',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-Token': token
          },
          body: JSON.stringify(opt)
        });
        dispatch({ type: 'comments/add-success', payload: { comment: res.data.result, count: getState().comments.data.items.length + 1 } });

      } catch (e) {
        dispatch({ type: 'comments/add-error' });
      }
    }
  }
}
