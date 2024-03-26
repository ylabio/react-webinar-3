export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * пост комментариев
   * @param { id, text, replyMode }
   * @return {Function}
   */
  post: ({ id, text, replyMode = false }) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/post-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree),isDeleted`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: id,
              _type: replyMode ? 'comment' : 'article',
            }
          }),
        });

        dispatch({type: 'comments/post-success', payload: {data: res.data.result}});
        
      } catch (e) {
        dispatch({type: 'comments/post-error'});
      }
    }
  },
}
