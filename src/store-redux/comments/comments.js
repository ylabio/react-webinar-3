export default {
  /**
   * Загрузка комментариев
   * @param postId
   * @return {Function}
   */
  load: (postId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${postId}`,
        });
        dispatch({
          type: "comments/load-success",
          payload: {
            data: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  create: ({ postId, text, parent }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/create-start" });

      try {
        await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify({ text, parent }),
        });
        const loadCommentsRes = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${postId}`,
        });
        dispatch({
          type: "comments/create-success",
          payload: {
            data: loadCommentsRes.data.result.items,
            count: loadCommentsRes.data.result.count,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/create-error" });
      }
    };
  },
};
