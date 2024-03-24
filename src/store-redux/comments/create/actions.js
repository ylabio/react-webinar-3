export default {
  /**
   * Создание нового комментария
   * @param id
   * @return {Function}
   */
  createComment: (token, data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({type: 'create_comment/load-start'});
  
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
        dispatch({type: 'create_comment/load-success', payload: {data: res.data.result}});
    
      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'create_comment/load-error'});
      }
    }
  },
}