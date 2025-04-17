export default {
  /**
   * Загрузка списка комментариев для товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  post: ({text, parentId, parentType}) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-start' })

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=%2A`,
          method: 'POST',
          body: JSON.stringify({
            "_id": "",
            "text": text,
            'parent': {"_id": parentId, "_type": parentType}
          })
        });
        // Комментарий загружен успешно
        dispatch({ type: 'comments/create-success' });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/create-error' });
      }
    }
  }
};
