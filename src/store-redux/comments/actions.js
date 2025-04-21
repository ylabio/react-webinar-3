export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // комментарии загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Создание комментария
   * @return {Function}
   */
  createComment: (id, text, type = 'article') => {
    return async (dispatch, getState, services) => {
      // установка признака ожидания создания
      dispatch({ type: 'comments/create-comment-start' });

      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: id,
              _type: type,
            },
          })
        });

        dispatch({ type: 'comments/create-comment-success',  payload: { newComment: res.data.result }});
      } catch (e) {
        //Ошибка создания
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
};
