export default {
  /**
   * Загрузка комментариев для товара
   * @param {string} articleId - ID товара
   * @return {Function}
   */
  loadComments: (articleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ 
        type: 'comments/load-start', 
        payload: { articleId } 
      });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`
        });
        
        dispatch({ 
          type: 'comments/load-success', 
          payload: { comments: res.data.result } 
        });
      } catch (e) {
        dispatch({ 
          type: 'comments/load-error', 
          payload: { error: e.message } 
        });
      }
    };
  },
  /**
   * Добавление нового комментария
   * @param {string} text - текст комментария
   * @param {string} id - ID товара и другого комментария
   * @param {string} type - тип комментария
   * @return {Function}
   */
  addComment: (text, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/addComment-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({ text, parent: { _id: id, _type: type } }),
        });
        dispatch({ type: 'comments/addComment-success', payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/addComment-error' });
      }
    };
  },
};