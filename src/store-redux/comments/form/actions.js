export default {
  /**
   * Открытие формы для создания нового комментария
   * @param id (коммента)
   */
  openForm: (id) => {
    return {type: 'comments/form/open', payload: {idComment: id}}
  },

  /**
   * Закрытие формы для создания нового комментария
   */
  closeForm: () => {
    return {type: 'comments/form/close'};
  },

   /**
   * Отправка данных формы по API для создания нового комментария
   * @param id (товара)
   * @param text
   * @return {Function}
   */
   onSubmit: (id, text) => {

    return async (dispatch, getState, services) => {

      // Отправка данных для создания коммента
      const params = {};
      if (getState().commentsForm.idComment) {
        params.parent = {_id: getState().commentsForm.idComment, _type: "comment"}
      } else {
        params.parent = {_id: id, _type: "article"}
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            "text": text,
            "parent": params.parent
          })
        });

        // Коммент успешно создан
        dispatch({type: 'comments/form/onSubmit/load-success'});

        // Сохранение нового комментария
        dispatch({type: 'comments/form/onSubmit/new-comment', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({type: 'comments/form/onSubmit/load-error'});
      }
    }
  },
}