export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=*&limit=*`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comments/load-error', payload: {data: e}});
      }
    }
  },

  /**
   * Загрузка пользователей
   * @param array
   * @return {Function}
   */
  loadUsernames: (array) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'})

      try {
        const res = await services.api.request({
          url: `/api/v1/users?search[query]=${array.join('|')}&items(_id,profile(name))`
        });
        // Юзернеймы загружены успешно
        dispatch({type: 'usernames/load-success', payload: {data: res.data.result.items.reduce((acc, curr) => {
          acc[curr._id] = curr.profile.name
          return acc;
        }, [])}});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'usernames/load-error', payload: {data: e}});
      }
    }
  },

  /**
   * Загрузка комментария на сервер
   * @param id {string}
   * @param text {string}
   * @param commentId {string}
   * @return {Function}
   */
  uploadComment: (id, text, commentId) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'})

      try {
        await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: {
            'accept': 'application/json'
          },
          body: JSON.stringify({
            text,
            parent: {
              _id: commentId ?? id,
              _type: commentId ? 'comment' : 'article'
            }
          })
        });
        // Юзернеймы загружены успешно
        dispatch({type: 'comments/upload-success'});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comments/upload-error', payload: {data: e}});
      }
    }
  },
}
