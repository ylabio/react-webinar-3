export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, _getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: {
            data: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  sendComment: (data, userName) => {
    return async (dispatch, _getState, services) => {
      dispatch({ type: "comments/send-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify(data),
        });
        // Комментарий отправлен успешно
        dispatch({
          type: "comments/send-success",
          payload: {
            newComment: res.data.result,
            userName: userName,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({
          type: "comments/send-error",
          payload: { error: "error" },
        });
      }
    };
  },

  openReply: (commentId) => {
    return (dispatch) =>
      dispatch({
        type: "comments/open-reply",
        payload: {
          id: commentId,
        },
      });
  },

  closeReply: (commentId) => {
    return (dispatch) =>
      dispatch({
        type: "comments/close-reply",
        payload: {
          id: commentId,
        },
      });
  },
};
