export default {
  /**
   * Загрузка комментариев к товару
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
        // Товар загружен успешно
        dispatch({
          type: 'comments/load-success',
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error', payload: { error: e } });
      }
    };
  },

  post: (data) => async (dispatch, getState, services) => {
    dispatch({ type: 'comments/post-start' });

    try {
      const res = await services.api.request({
        method: 'POST',
        url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted',
        body: JSON.stringify(data),
      });
      // Товар загружен успешно
      dispatch({
        type: 'comments/post-success',
        payload: {
          item: res.data.result,
        },
      });
    } catch (e) {
      dispatch({ type: 'comments/post-error', payload: { error: e } });
    }
  },
};
