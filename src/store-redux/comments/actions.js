export default {
  /**
   * Загрузка комментариев по id товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Добавление комментария
   * @param text
   * @param parent
   * @return {Function}
   */
  add: ({ text, parent }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/add-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent
          }),
        });
        // Комментарий добавлен успешно
        dispatch({ type: 'comments/add-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/add-error' });
      }
    };
  }
};
