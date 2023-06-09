export const commentsActions = {
  load: (articleId) => async (dispatch, getState, services) => {
    dispatch({ type: "comments/set", payload: { waiting: true } });

    try {
      const res = await services.api.request({
        url: `/api/v1/comments/?search[parent]=${articleId}&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)&limit=*`,
      });
      const comments = res.data.result.items;
      console.log("comments :>> ", comments);
      dispatch({
        type: "comments/set",
        payload: { comments },
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "comments/set", payload: { waiting: false } });
    }
  },
  sendComment:
    (text, type, parentId) => async (dispatch, getState, services) => {
      dispatch({ type: "comments/set", payload: { sendCommentWaiting: true } });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          body: JSON.stringify({
            parent: { _id: parentId, _type: type },
            text,
          }),
          method: "POST",
        });
        const newComment = res.data.result;
        const user = services.store.state.session.user;
        dispatch({
          type: "comments/addComment",
          payload: { ...newComment, author: { ...user } },
        });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({
          type: "comments/set",
          payload: { sendCommentWaiting: false },
        });
      }
    },
};
