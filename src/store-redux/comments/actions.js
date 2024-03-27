export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  send: (data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/send-start'});

      try {
        const res = await services.api.request({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
          },
          body: JSON.stringify(data),
          url: `/api/v1/comments?fields=author(profile(name)),dateCreate,text,parent(_type),isDeleted`
        });
        // Товар загружен успешно
        dispatch({type: 'comments/send-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/send-error'});
      }
    }
  },

  setCommentId: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/set-comment-id', payload: {data: id}});
    }
  }
}
