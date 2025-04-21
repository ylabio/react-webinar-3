export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error', payload: { error: e } });
      }
    };
  },

  /**
   * Отправка комментария первого уровня
   * @param id
   * @return {Function}
   */
  post: (xToken, text, parentId) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comment/post-start' });
      const requestBody = JSON.stringify({
        text: text,
        parent: { _id: `${parentId}`, _type: 'article' },
      });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'X-Token': xToken,
          },
          body: requestBody,
        });
        dispatch({ type: 'comment/post-success', payload: { data: res.data.result }});
      } catch (e) {
        //Ошибка загрузки
        console.log(e);

        dispatch({ type: 'comment/post-error', payload: { error: e } });
      }
    };
  },

  /**
   * Отправка ответа на комментарий
   * @param id
   * @return {Function}
   */

  reply: (xToken, text, commentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comment/reply-start' });
      const requestBody = JSON.stringify({
        text: text,
        parent: { _id: `${commentId}`, _type: 'comment' },
      });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'X-Token': xToken,
          },
          body: requestBody,
        });
        dispatch({ type: 'comment/reply-success', payload: { data: res.data.result }});
      } catch (e) {
        //Ошибка загрузки
        console.log(e);

        dispatch({ type: 'comment/reply-error', payload: { error: e } });
      }
    };
  },
};
