export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии были загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result.items },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  /**
   * @param parent {Object}
   * @param commenText {String}
   * @return {Function}
   */

  postComment: (commenText, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/post-start" });

      try {
        const res = await services.api.request({
          url: "api/v1/comments?lang=ru&fields=%2A",
          method: "POST",
          body: JSON.stringify({
            text: commenText,
            parent: parent,
          }),
        });
        dispatch({
          type: "comments/post-success",
          payload: { data: [...getState().comments.data, res.data.result] },
        });
      } catch (e) {
        console.log(e);
        dispatch({ type: "comments/post-error" });
      }
    };
  },
};
