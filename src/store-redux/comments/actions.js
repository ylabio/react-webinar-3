export default {
  /**
   * Загрузка коментов
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({
          type: "comments/load-success",
          payload: { comments: res.data.result.items },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  sendComment: (user, text, parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      let type;
      if (getState().article.data._id === parentId) {
        type = "article";
      } else {
        type = "comment";
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify({
            text: text,
            parent: { _id: parentId, _type: type },
          }),
        });

        dispatch({
          type: "comments/load-success",
          payload: {
            comments: [
              ...getState().comments.comments,
              { ...res.data.result, author: user },
            ],
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },
};
