export default {
  /**
   * Загрузка товара
   * @param {string} id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({type: "comments/load-start"});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count`,
        });
        // Комментарии загружены успешно
        dispatch({type: "comments/load-success", payload: {data: res.data.result.items}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: "comments/load-error"});
      }
    };
  },

  /**
   * Загрузка товара
   * @param comment
   * @return {Function}
   */
  sendComment: comment => {
    return async (dispatch, getState, services) => {
      try {
        const commentRes = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: "POST",
          body: JSON.stringify(comment),
        });
        dispatch({type: "comments/add-comment", payload: commentRes.data.result});
        dispatch({type: "comments/chose-comment", payload: null})
      } catch (e) {
        //Ошибка загрузки
        // dispatch({type: "comments/load-error"});
      }
    };
  },

  /**
   * Выбор текущего комментария
   * @param {string} id 
   */
  choseComment: id => {
    return (dispatch) => {
      dispatch({type: "comments/chose-comment", payload: id});
    }
  },
};
