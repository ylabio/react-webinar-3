export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});
  
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
    
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Динамическое добавление нового комментария
   * @param {Object} comment 
   * @returns {Function}
   */
  update: (comment) => {
    return (dispatch) => {
      dispatch({type: 'add_comment/update-success', payload: {data: comment}});
    }
  }
}
  