export default {
  /**
   * Загрузка комментариев по id товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comment/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружен успешно
        dispatch({type: 'comment/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error'});
      }
    }
  },

  /**
   * Загрузка комментариев по id товара
   * @param id
   * @return {Function}
   */
  submit: (options) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comment/submit-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(options)
        });
        // Комментарии загружен успешно
        dispatch({type: 'comment/submit-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/submit-error'});
      }
    }
  },
}
