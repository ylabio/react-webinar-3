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
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });

        dispatch({type: 'comments/load-success', payload: res.data.result});
  
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  
  postComment: (id, text, type) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({type: 'comments/post-start'});

        const parentObj = {
          parent: {
            _id: id,
           _type: type
          },
          text,
        }

        const response = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(parentObj)
        });

        dispatch({type: 'comments/post-success', payload: response.data.result});
    
      } catch (e) {
        dispatch({type: 'comments/post-error'});
      }
      }
    },
}