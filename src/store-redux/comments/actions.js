export default {
  load: parentId => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted)&limit=*&search[parent]=${parentId}`,
        });
        
        dispatch({ 
          type: 'comments/load-success', 
          payload: res.data.result.items 
        });
      } catch (e) {
        console.error('Ошибка загрузки комментариев:', e);
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  addComment: (text, parentId, parentType = 'article') => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType
            }
          })
        });

        const articleId = parentType === 'article' ? parentId : getState().article.data._id;
        dispatch({
          type: 'comments/load-start'
        });
        
        try {
          const loadRes = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted)&limit=*&search[parent]=${articleId}`,
          });
          
          dispatch({
            type: 'comments/load-success',
            payload: loadRes.data.result.items
          });
        } catch (loadError) {
          console.error('Ошибка при перезагрузке комментариев:', loadError);
          dispatch({ type: 'comments/load-error' });
        }

        return res.data;
      } catch (e) {
        console.error('Ошибка добавления комментария:', e);
        throw e;
      }
    };
  }
};