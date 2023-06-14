export default {

    setAnswerId: (id) => {
      return {type: 'comments/setAnswerId', payload: {answerId: id}};
    },

    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
          });

          console.log(res);
          
          dispatch({type: 'comments/load-success', payload: {comments: res.data.result.items, count: res.data.result.count}});
  
        } catch (e) {
          
          dispatch({type: 'comments/load-error', payload: {errors: "comments.loaderror"}});
        }
      }
    },

    send: (answerId, paramId, text) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
            method: "POST",
            body: JSON.stringify({
              text,
              parent: { _id: answerId,
                        _type: answerId === paramId ? "article" : "comment"
              }
            })
          });

          console.log(res);
          
          dispatch({type: 'comments/send-success', payload: {comments: res.data.result}});

          dispatch({type: "comments/setAnswerId", payload: {answerId: paramId}})
  
        } catch (e) {
          dispatch({type: 'comments/load-error', payload: {errors: "comments.senderror"}});
        }
      }
    },

  }
  