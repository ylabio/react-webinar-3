export default {
  reply: (id) => {
    return { type: 'comments/reply', payload: { id } };
  },
  cancel: () => {
    return { type: 'comments/cancel' };
  },

  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  add: ({ text, parent = {} }) => {
    return async (dispatch, getState, services) => {
      const token = services.store.getState().session.token;
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/add-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=author(profile(name)),text,dateCreate,parent(_id, _type),isDeleted`,
          method: 'POST',
          headers: { ['X-Token']: token },
          body: JSON.stringify({ text, parent }),
        });
        console.log(res);
        // Коментарии загружен успешно
        dispatch({
          type: 'comments/add-success',
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({ type: 'comments/add-error' });
      }
    };
  },
};
