export default {
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        dispatch({type: 'comments/load-success', payload: {
          items: response.data.result.items,
          count: response.data.result.count
        }});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'post-comment/post-start'});

      try {
        const response = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(data)
        });
        console.log(response)

        dispatch({type: 'post-comment/post-success', payload: {
            comment: response.data.result
          }})
      } catch (error) {
        dispatch({type: 'post-comment/post-error', payload: error});
      }
    }
  },

  setTypeComment: (type) => {
    return {type: 'comments/setTypeComment', payload: {type}}
  }
}