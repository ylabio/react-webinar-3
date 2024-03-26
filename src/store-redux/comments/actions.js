export default {
  /**
   * Загрузка комментариев к товару
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch {
        // Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  send: (data, user) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          method: 'POST',
          url: '/api/v1/comments',
          body: JSON.stringify(data)
        });
        // Комментарий отправлен успешно
        dispatch({type: 'comments/send-success', payload: {data: res.data.result, author: user}});
      } catch {
        // Ошибка загрузки
        dispatch({type: 'comments/send-error'});
      }
    }
  }
}