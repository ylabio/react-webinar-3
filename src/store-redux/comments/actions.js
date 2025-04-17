export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error', payload: { error: e } });
      }
    };
  },
  /**
   * Создание комментария
   * @param data
   * @return {Function}
   */
  create: data => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({ type: 'comments/create-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: 'POST',
          body: JSON.stringify(data),
        });
        // Комментарий создан успешно
        dispatch({ type: 'comments/create-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка создания
        dispatch({ type: 'comments/create-error', payload: { error: e } });
      }
    };
  },
};
