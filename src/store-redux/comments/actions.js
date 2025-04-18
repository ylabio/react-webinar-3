export default {
  load: articleId => async (dispatch, getState, services) => {
    dispatch({ type: 'comments/load-start' });
    try {
      const res = await services.api.request({
        url: `/api/v1/comments?fields=*,author(profile(name))&limit=*&search[parent]=${articleId}`,
      });
      dispatch({
        type: 'comments/load-success',
        payload: { data: res.data.result },
      });
    } catch (e) {
      dispatch({ type: 'comments/load-error' });
    }
  },

  add:
    (text, parentId, parentType = 'article') =>
    async (dispatch, getState, services) => {
      dispatch({ type: 'comments/add-start' });
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: { _id: parentId, _type: parentType },
          }),
        });
        dispatch({
          type: 'comments/add-success',
          payload: { comment: res.data.result },
        });
        return true;
      } catch (e) {
        dispatch({ type: 'comments/add-error' });
        return false;
      }
    },
};
