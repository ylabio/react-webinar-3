import config from "../../config";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  loadById: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count&limit=*`,
        });
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  create: (text, type, parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/create-start" });
      const token = localStorage.getItem("token");
      if (token) {
        try {
          services.api.setHeader(config.tokenHeader, token);
          const res = await services.api.request({
            url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
            method: 'POST',
            body: JSON.stringify({
              text: text,
                    parent: {
                      _id: parentId,
                      _type: type
                    }
              })
          });
          console.log( res.data.result)
          dispatch({
            type: "comments/create-success",
            payload: { data: res.data.result },
          });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comments/create-error" });
        }
      }
    };
  },
};
