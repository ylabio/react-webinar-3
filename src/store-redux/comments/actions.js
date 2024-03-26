export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type))&limit=*`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comments/load-error', payload: {data: e}});
      }
    }
  },

  /**
   * Загрузка комментария на сервер
   * @param id {string}
   * @param text {string}
   * @param commentId {string}
   * @return {Function}
   */
  uploadComment: (id, text, commentId) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'})

      try {
        const response = await services.api.request({
          url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
          method: 'POST',
          headers: {
            'accept': 'application/json'
          },
          body: JSON.stringify({
            text,
            parent: {
              _id: commentId ?? id,
              _type: commentId ? 'comment' : 'article'
            }
          })
        });
        // Юзернеймы загружены успешно
        dispatch({type: 'comments/upload-success', payload: {data: response.data.result}});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comments/upload-error', payload: {data: e}});
      }
    }
  },
}
