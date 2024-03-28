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
          type: "comments/load-success", payload: { data: res.data.result.items },
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

  createOrAddComment: (data) => {
    const {text, parentId, parentType, currentUser} = data;
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/add-new-start' });

      try {
        const payload = {
          text,
          parent: { _id: parentId, _type: parentType },
        };

        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(payload),
        });

        dispatch({ type: 'comments/add-new-success', payload: {
            data: res.data.result,
            user: currentUser
          } });
        dispatch({ type: 'comments/add-new-success' });
      } catch (error) {
        dispatch({ type: 'comments/add-new-error', payload: error.message });
      }
    };
  },

  openReply: (id) => {
    return (dispatch) =>
      dispatch({
        type: "comments/open-reply",
        payload: {
          id,
        },
      });
  },

  closeReply: (id) => {
    return (dispatch) =>
      dispatch({
        type: "comments/close-reply",
        payload: {
          id,
        },
      });
  },
};