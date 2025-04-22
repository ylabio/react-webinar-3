export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'texts/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'texts/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'texts/load-error' });
      }
    };
  },
  addComment: (data, userName) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'texts/send-start' });
      const token = localStorage.getItem('token');
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          'X-token': token,
          body: JSON.stringify({
            text: data.text,
            parent: { ...data.parent },
          }),
        });
        dispatch({ type: 'texts/send-success', payload: { data: res.data.result, name: userName } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'texts/send-error' });
      }
    };
  },
};
