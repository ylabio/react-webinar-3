
export default {
  /**
   * Загрузка комментариев к товару
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
        dispatch({ type: 'comments/load-success', payload: { items: res.data.result.items, count: res.data.result.count } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' });
      }
    };
  },

  setActiveComment: id => {
    return (dispatch) => {
      dispatch({ type: 'comments/set-active-comment', payload: id });
    }
  },

  resetActiveComment: () => {
    return (dispatch) => {
      dispatch({ type: 'comments/set-active-comment', payload: null });
    }
  },

  sendComment: (text, id, type='article') => {
    return async (dispatch, getState, services) => {
      const token = services.store.state.session.token;
      dispatch({ type: 'comments/send-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: 'POST',
          headers: { 'X-Token': token },
          body: JSON.stringify({"text": text, "parent": { "_id": id, "_type": type }}),
        });
        // Комментарий отправлен успешно
        dispatch({ type: 'comments/send-success', payload: res.data.result });
      } catch (e) {
        //Ошибка
        dispatch({ type: 'comments/send-error' });
      }
    }
  },

};

