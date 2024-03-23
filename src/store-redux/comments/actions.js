export default {
  /**
   * Загрузка комментариев
   * @param parent
   * @return {Function}
   */
  load: (parent) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parent}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {count: res.data.result.count, items: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Отправка комментария
   * @param parent
   * @param text
   * @return {Function}
   */
  send: (user, parent, text) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания отправки
      dispatch({type: 'comments/send-start'});

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({parent, text})
        });

        // Комментарий отправлен успешно
        dispatch({
          type: 'comments/send-success',
          payload: {
            comment: {
              ...res.data.result,
              author: {...res.data.result.author, profile: {name: user.profile.name}}
            }
          }
        });
      } catch (e) {
        //Ошибка отправки
        dispatch({type: 'comments/send-error'});
      }
    }
  },
}
