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
  setCommentsData: commentsOpenForData => {
    return dispatch => {
      dispatch({
        type: 'user-comment/update-data',
        payload: {
          data: commentsOpenForData,
        },
      });
      dispatch({ type: 'user-comment/load-success' });
    };
  },
  setUserMessage: value => {
    return dispatch => {
      dispatch({ type: 'user-comment/upload-comment', payload: { text: value } });
    };
  },
  resetForm: () => {
    return dispatch => {
      dispatch({ type: 'user-comment/reset-form' });
    };
  },
  resetUserCommentStore: () => {
    return dispatch => {
      dispatch({ type: 'user-comment/reset' });
    };
  },
};
