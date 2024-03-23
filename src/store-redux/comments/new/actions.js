export default {
  sendComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "new-comment/send-start" });
      console.log("redux-body");
      console.log(data);

      try {
        console.log(services.api.defaultHeaders);
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log("res");
        console.log(res);
        // Комментарий отправлен успешно
        dispatch({
          type: "comments/send-success",
          payload: {
            success: true,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({
          type: "comments/send-error",
          payload: { success: false, error: "error" },
        });
      }
    };
  },
};
