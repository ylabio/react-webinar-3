export default {
  /**
   * Загрузка коммента
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего коммента и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Коммент загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    };
  },

  /**
   * Создание коммента
   * @param text,
   * @param id,
   * @param type,
   * @return {Function}
   */
  create: (text, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comment/create-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({ text, parent: { _id: id, _type: type } }),
        });
        // Коммент создан успешно
        dispatch({ type: 'comment/create-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка создания
        dispatch({ type: 'comment/create-error' });
      }
    };
  },
};
