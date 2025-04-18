export default {
  init: (userId = '', userToken = '', articleiId = '') => {
    return (dispatch) => {
      dispatch({ type: 'user-comment/load-start' });
      dispatch({
        type: 'user-comment/update-user-log-data',
        payload: { userId: userId, userToken: userToken, parentId: articleiId },
      });
      dispatch({ type: 'user-comment/load-success' });
    };
  },
  setCommentsId: (parentId, lastTreeId, typeComment) => {
    return (dispatch) => {
      dispatch({ type: 'user-comment/load-start' });
      dispatch({
        type: 'user-comment/update-comment-ids',
        payload: { _id: parentId, lastId: lastTreeId, _type: typeComment },
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
    return (dispatch) => {
      dispatch({type: 'user-comment/reset'})
    }
  }
};
