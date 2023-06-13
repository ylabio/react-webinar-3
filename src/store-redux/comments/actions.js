export default {
    /**
     *
     * @param id
     * @return {Function}
     */
    loadComments: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});

        try {
         const response = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
         })
         dispatch({type: 'comments/load-success', payload: {data: response.data.result.items}})
  
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error', payload: e?.message});
        }
      }
    },
  }