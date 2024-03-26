export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии успешно загружены
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        // Ошибка загрузки комментариев
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  addComment: (text, id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const resp = await services.api.request({
          url: `api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            "text": text,
            "parent": {"_id": `${id}`, "_type": "article"}
          })
        });
        const newComment = JSON.parse(JSON.stringify(resp.data.result));
        dispatch({ type: 'comments/add-success', payload: newComment });


      } catch (error) {
        console.error("Error adding comment:", error);
        dispatch({type: 'comments/add-error', payload: {error}});
      }
    }
  },

  addAnswer: (text, id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const resp = await services.api.request({
          url: `api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            "text": text,
            "parent": {"_id": `${id}`, "_type": "comment"}
          })
        });
        const newAnswer = JSON.parse(JSON.stringify(resp.data.result));
        dispatch({type: 'comments/add-answer-success', payload: newAnswer});

      } catch (error) {
        console.error("Error adding answer:", error);
        dispatch({type: 'comments/add-answer-error', payload: {error}});
      }
    }
  }
}
