export default {
  /**
   * Загрузка комментов
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментов и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комменты загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items, count: res.data.result.count}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

	openReply: (commentId) => {
    return (dispatch, getState) =>
      dispatch({type: 'comments/open-reply', payload: {id: commentId}});
  },

	closeReply: () => {
    return (dispatch, getState) =>
      dispatch({type: 'comments/close-reply'});
  },

	addComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(data),
        });

        dispatch({type: "comments/add-success"});
      } catch (error) {
        dispatch({type: 'comments/load-error'});
      }
    };
  },
}