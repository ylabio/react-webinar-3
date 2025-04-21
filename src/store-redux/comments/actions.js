export default {
  /**
   * Загрузка комментариев по товару
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего списка комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Список комментариев загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items, count: res.data.result.count } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Загрузка комментариев по товару
   */
  addComment: (parent, text, callback) => {
    return async (dispatch, getState, services) => {
      try {
        if (!text?.trim()) return;
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(

        {
          "text": text,
          "parent": {...parent}
        })
        }).then(()=>{
          callback()
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
};
