import createCommentTree from "../../utils/createCommentTree";

export const commentsActions = {
  load: (articleId) => async (dispatch, getState, services) => {
    dispatch({ type: "comments/set", payload: { waiting: true } });

    try {
      const res = await services.api.request({
        url: `/api/v1/comments/?search[parent]=${articleId}&limit=*`,
      });
      const comments = res.data.result.items;
      const commentsLen = comments.length;
      const authorIds = [...new Set(comments.map((el) => el.author._id))];
      const usersRes = await Promise.all(
        authorIds.map((el) =>
          services.api.request({
            url: `/api/v1/users/?search[query]=${el}&fields=profile`,
          })
        )
      );
      const commentsWithAuthor = comments.map((comment) => {
        const author = usersRes.find(
          (el) => el.data.result.items[0]._id == comment.author._id
        );
        const {
          _id,
          profile: { name },
        } = author.data.result.items[0];
        return { ...comment, author: { _id, name } };
      });
      const commentsWithAuthorTree = createCommentTree(commentsWithAuthor);
      dispatch({
        type: "comments/set",
        payload: { comments: commentsWithAuthorTree, commentsLen },
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
        await services.api.request({
          url: `/api/v1/comments`,
          body: JSON.stringify({
            parent: { _id: parentId, _type: type },
            text,
          }),
          method: "POST",
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
