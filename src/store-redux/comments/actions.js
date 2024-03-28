export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({type: 'load-comments/load-start'});
  
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'load-comments/load-success', payload: {data: res.data.result}});
    
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'load-comments/load-error'});
      }
    }
  },

  /**
   * Создание нового комментария
   * @param {String} token
   * @param {Object} data
   * @return {Function}
   */
  create: (token, data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({type: 'create-comment/create-start'});
  
      try {
        const res = await services.api.request({
          url: 'api/v1/comments',
          method: 'POST',
          headers: {
            'X-Token': token
          },
          body: JSON.stringify(data)
        });
        // Комментарий создан успешно
        dispatch({type: 'create-comment/create-success', payload: {data: res.data.result}});
    
      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'create-comment/create-error'});
      }
    }
  },

  /**
   * Динамическое добавление нового комментария
   * @param {Object} comment 
   * @returns {Function}
   */
  add: (comment) => {
    return (dispatch) => {
      dispatch({type: 'add-comment/add-success', payload: {data: comment}});
    }
  }
}
  