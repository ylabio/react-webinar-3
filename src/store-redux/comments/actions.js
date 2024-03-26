export default {
  /**
   * Загрузка комментариев
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
        dispatch({type: 'comments/load-success', payload: {data: {items: res.data.result.items, count: res.data.result.count}}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  setCurrentId: (id) => {
    return {type: 'comments/set-current', payload: {data: id}};
  },
  removeCurrentId: () => {
    return {type: 'comments/remove-current'};
  },
  send: (token, id, type, text, user) => {

    const data = {
      "text": text,
      "parent": { "_id": id, "_type": type }
    }

    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify(data),
        });
        // Комментарий отправлен успешно
        dispatch({type: 'comments/send-success', payload: {data: {...res.data.result, author: user}}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/send-error' });
      }
    }
  },
}
