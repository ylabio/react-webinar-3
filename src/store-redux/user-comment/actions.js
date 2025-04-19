export default {
  init: (userId = '', userToken = '', articleiId = '') => {
    return dispatch => {
      dispatch({ type: 'user-comment/load-start' });
      dispatch({
        type: 'user-comment/update-user-log-data',
        payload: { userId: userId, userToken: userToken, parentId: articleiId },
      });
      dispatch({ type: 'user-comment/load-success' });
    };
  },
  setCommentsData: (parentId, lastTreeId, typeComment, author, isFormInComments) => {
    return dispatch => {
      dispatch({ type: 'user-comment/load-start' });
      dispatch({
        type: 'user-comment/update-data',
        payload: {
          _id: parentId,
          lastId: lastTreeId,
          _type: typeComment,
          _author: author,
          formPlace: isFormInComments,
        },
      });
      dispatch({ type: 'user-comment/load-success' });
    };
  },
  setUserMessage: value => {
    return dispatch => {
      dispatch({ type: 'user-comment/load-start' });
      dispatch({ type: 'user-comment/upload-comment', payload: { text: value } });
      dispatch({ type: 'user-comment/load-success' });
    };
  },
  resetUserCommentStore: () => {
    return dispatch => {
      dispatch({ type: 'user-comment/reset' });
    };
  },
};
