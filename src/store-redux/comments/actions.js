export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });
        // комментарии загружены
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    }
  },

  addComment: (text, parentId, type) => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/comment-load-start' });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?lang=ru&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: "POST",
          body: JSON.stringify({
            text,
            parent: { _id: parentId, _type: type },
          }),
        });

        // комментарии загружены
        dispatch({ type: 'comments/add-comment', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    }
  },

}
