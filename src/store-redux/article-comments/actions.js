export default {
  /**
   * Загрузка комментариев к товару
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "articleComments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({
          type: "articleComments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "articleComments/load-error" });
      }
    };
  },

  send: (user, token, _id, _type, text) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "articleComments/post-clear",
      });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Token": token,
          },
          body: JSON.stringify({
            text: text,
            parent: { _id, _type },
          }),
        });

        // Собираем данные при удачном POST запросе и обновляем стейт комментариев
        if (res.status == "200") {
          dispatch({
            type: "articleComments/add-comment",
            payload: {
              data: {
                _id: res.data.result._id,
                text: res.data.result.text,
                dateCreate: res.data.result.dateCreate,
                author: {
                  profile: {
                    name: user,
                  },
                  _id: res.data.result.author._id,
                },
                parent: {
                  _id: res.data.result.parent._id,
                  _type: res.data.result.parent._type,
                },
              },
            },
          });
        }
      } catch (e) {
        console.log("Application error");
        console.log(e);
      }
    };
  },

  setFormId: (id) => {
    return (dispatch) => {
      dispatch({ type: "articleComments/setFormId", payload: { id: id } });
    };
  },
};
