export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}`
          });

          const data = {
            comments: res.data.result,
            length: res.data.result.items.length
          }

          dispatch({type: 'comments/load-success', payload: data});
  
        } catch (e) {
          dispatch({type: 'comments/load-error'});
        }
      }
    },
  }
  