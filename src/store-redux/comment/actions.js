export default {
    /**
     * Загрузка комментариев
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comment/load-start'});
  
        try {
          const res = await services.api.request({
            url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          dispatch({type: 'comment/load-success', payload: res.data.result});
  
        } catch (e) {
          dispatch({ type: 'comments/load-error', payload: error.message });
        }
      }
    },

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
  }
  