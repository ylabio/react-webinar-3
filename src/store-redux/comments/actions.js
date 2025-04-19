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
};