export default {
  /**
   * Загрузка товара
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
        // комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  create: comment => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/create-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(comment),
        });
        // комментарии загружены успешно
        dispatch({ type: 'comments/create-success', payload: { data: res.data.result.items } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/create-error' });
      }
    };
  },
};