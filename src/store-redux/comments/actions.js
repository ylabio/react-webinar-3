export default {
  loadComments: parentId => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]= ${parentId}`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  createComment: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-start' });
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({ text, parent }),
        });

        if (!res.data.error) {
          dispatch({ type: 'comments/create-success', payload: res.data.result });
        } else {
          dispatch({ type: 'comments/create-error', payload: res.data.error });
        }
      } catch (e) {
        dispatch({ type: 'comments/create-error', payload: e.message });
      }
    };
  },
};
