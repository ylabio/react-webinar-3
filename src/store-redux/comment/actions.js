export default {
  /**
   * Загрузка комментариев
   * @param articleId
   * @return {Function}
   */
  load: (articleId) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев товара и установка признака ожидания загрузки
      dispatch({type: 'comment/load-start'});

      try {

        const fields = 'items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count'

        const res = await services.api.request({
          url: `/api/v1/comments?fields=${fields}&limit=*&search[parent]=${articleId}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comment/load-success', payload: {
          data: res.data.result.items,
          count: res.data.result.count,
        }});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error'});
      }
    }
  },

  /**
   * Добавление комментария
   * @param id, type, text
   * @return {Function}
   */
  add: (id, type, text) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comment/add-start'});

      try {
        const data = {
          text,
          parent: {_id: id, _type: type}
        };

        const fields = '_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted'

        const res = await services.api.request({
          url: `/api/v1/comments?fields=${fields}`,
          method: 'POST',
          headers: services._api.defaultHeaders,
          body: JSON.stringify(data)
        });

        // Комментарий добавлен успешно
        dispatch({
          type: 'comment/add-success',
          payload: {data: res.data.result}
        });

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comment/add-error'});
      }
    }
  }

}
