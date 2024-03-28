import config from "../../config";
export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id, skip = 0) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?limit=*&skip=${skip}&search[parent]=${id}&fields=items(text,dateUpdate,parent(_id),author(_id,profile(name))),count`,
        });
        dispatch({
          type: "comments/load-success",
          payload: {
            data: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  add: (body) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/add-start" });
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=text,dateUpdate,parent(_id),author(profile(name))`,
          method: "POST",
          body: JSON.stringify(body),
        });
        dispatch({
          type: "comments/add-success",
          payload: { data: res.data.result },
        });
      } catch (error) {
        dispatch({ type: "comments/add-error" });
      }
    };
  },
  setTypeComments: (type) => {
    return { type: "comments/setTypeComments", payload: { type } };
  },
  setShowForm: (clickedId, showId, levelPadding) => {
    return {
      type: "comments/showForm",
      payload: { clickedId, showId, levelPadding },
    };
  },
  setIdAfterRedirect: (id) => {
    return { type: "comments/setIdAfterRedirect", payload: { id } };
  },
};
