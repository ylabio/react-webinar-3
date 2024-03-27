export default {

    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comments/load-start', payload: {currentArticle: id}});

        try {
          const res = await services.api.request({
            url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          dispatch({type: 'comments/load-success', payload: {comments: res.data.result.items}});
        } catch (e) {
          dispatch({type: 'article/load-error'});
        }
      }
    },
  
    sendComment: (message, id, type) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/send-comments-start'});

        try {
          const res = await services.api.request({
            url: `api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
            method: 'POST',
            body:
              JSON.stringify(
                {
                  "text": message,
                  "parent": {"_id": id, "_type": type}
                }
              )
          })

          dispatch({type: 'comments/send-comments-success', payload: {newComment: res.data.result}})
        } catch (e) {
          dispatch({type: 'article/load-error'});
        }
      }
    },
  
    changeParent: (type, id) => {
      return {type: "comments/change-parent", payload: {parentType: type, parentID: id}}
    },  
  }