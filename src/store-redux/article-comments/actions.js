export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article-comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}&lang=${services.i18n.lang}`
        });
        // Товар загружен успешно
        dispatch({type: 'article-comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comments/load-error'});
      }
    }
  },

  login: (login,_id) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({type: 'article-comments/login', payload: {login: login, _id: _id}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comments/login-error'});
      }
    }
  },
}
