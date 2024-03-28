export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  post: (data) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          method: "POST",
          url: "/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted",
          body: JSON.stringify(data),
        });
        dispatch({
          type: "comments/add-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        dispatch({ type: "comments/add-error" });
      }
    };
  },
};
