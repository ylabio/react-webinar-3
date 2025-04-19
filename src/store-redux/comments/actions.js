export const loadComments = (articleId) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: 'comments/load-start' });

    try {
      const res = await services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type))&limit=*&search[parent]=${articleId}`
      });

      dispatch({
        type: 'comments/load-success',
        payload: res.data.result.items
      });
    } catch (e) {
      dispatch({
        type: 'comments/load-error',
        payload: e.response?.data?.error?.data?.issues || ['Ошибка загрузки']
      });
    }
  };
};

export const createComment = (text, parentId, parentType) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: 'comments/create-start' });

    try {
      const res = await services.api.request({
        method: 'POST',
        url: '/api/v1/comments',
        body: JSON.stringify({
          text,
          parent: {
            _id: parentId,
            _type: parentType
          }
        })
      });

      dispatch({
        type: 'comments/create-success',
        payload: res.data.result
      });

      return res.data.result;
    } catch (e) {
      dispatch({
        type: 'comments/create-error',
        payload: e.response?.data?.error?.data?.issues || ['Ошибка отправки']
      });
      throw e;
    }
  };
};
