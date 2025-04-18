export default {
  load: articleId => {
    return async (dispatch, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(_id),parent(_id,_type)),count&limit=*&search[parent]=${articleId}`,
        });

        dispatch({
          type: 'comments/load-success',
          payload: res.data.result,
        });
      } catch (e) {
        dispatch({
          type: 'comments/load-error',
          payload: e.message,
        });
      }
    };
  },

  add: (text, parentId, parentType = 'article') => {
    return async (dispatch, getState, services) => {
      try {
        await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType,
            },
          }),
        });

        const articleId = parentType === 'article' ? parentId : getState().article.data._id;
        dispatch(this.load(articleId));
        dispatch(this.setReply(null));
      } catch (e) {
        dispatch({
          type: 'comments/add-error',
          payload: e.message,
        });
      }
    };
  },

  setReply: commentId => ({
    type: 'comments/set-reply',
    payload: commentId,
  }),
};
