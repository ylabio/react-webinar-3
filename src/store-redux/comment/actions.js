export default {
  loadComments: (productId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${productId}`,
        });

        dispatch({ type: "comments/load-success", payload: res.data.result });
      } catch (error) {
        dispatch({ type: "comments/load-error", payload: error.message });
      }
    };
  },
  createOrAddComment: (data) => {
    const { text, parentId, parentType } = data;
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/add-new-start" });

      try {
        const payload = {
          text,
          parent: { _id: parentId, _type: parentType },
        };

        await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(payload),
        });

        dispatch({ type: "comments/add-new-success" });
      } catch (error) {
        dispatch({ type: "comments/add-new-error", payload: error.message });
      }
    };
  },
  openReply: (id) => {
    return (dispatch) =>
      dispatch({
        type: "comments/open-reply",
        payload: {
          id,
        },
      });
  },

  closeReply: (id) => {
    return (dispatch) =>
      dispatch({
        type: "comments/close-reply",
        payload: {
          id,
        },
      });
  },
};
