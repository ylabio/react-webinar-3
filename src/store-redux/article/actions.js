export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
        });
        // Товар загружен успешно
        dispatch({ type: 'article/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' });
      }
    }
  },
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({ type: 'article-comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article-comments/load-error' });
      }
    }
  },
  sendComment: (data) => {
    return async (dispatch, getState, services) => {

      dispatch({ type: 'article-comments/send-start' });
      const res = await services.api.request({
        url: '/api/v1/comments',
        method: 'POST',
        body: JSON.stringify(data),
        // token: getState().session.token,
      });
      if (res.status < 399) {
        dispatch({ type: 'article-comments/send-success', payload: { data: res.data } });
        return;
      } else {
        dispatch({ type: 'article-comments/send-error', payload: { data: res.data } });
        return
      }
    }
  }
}