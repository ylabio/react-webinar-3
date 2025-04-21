export const loadComments = (articleId) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: 'comments/load-start' });

    try {
      const res = await services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type))&limit=*&search[parent]=${articleId}`
      });

      dispatch({
        type: 'comments/load-success',
        payload: res.data.result.items
      });
    } catch (e) {
      dispatch({
        type: 'comments/load-error',
        payload: e.response?.data?.error?.data?.issues || ['Ошибка загрузки']
      });
    }
  };
};

export const createComment = (text, parentId, parentType) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: 'comments/create-start' });

    try {
      const reduxUser = getState().session?.user;
      const customStoreUser = services.store.getState().session?.user;
      const currentUser = reduxUser || customStoreUser;

      if (!currentUser) {
        throw new Error('User not found in any store');
      }

      const res = await services.api.request({
        method: 'POST',
        url: '/api/v1/comments',
        body: JSON.stringify({
          text,
          parent: {
            _id: parentId,
            _type: parentType
          }
        })
      });

      const newComment = {
        ...res.data.result,
        author: {
          _id: currentUser._id,
          profile: {
            name: currentUser.profile.name 
          }
        },
        parent: {
          _id: parentId,
          _type: parentType
        },
        dateCreate: res.data.result.dateCreate || new Date().toISOString()
      };

      dispatch({
        type: 'comments/create-success',
        payload: {
          comment: newComment,
          parentId,
          parentType
        }
      });

      return newComment;
    } catch (e) {
      dispatch({
        type: 'comments/create-error',
        payload: e.response?.data?.error?.data?.issues || [e.message]
      });
      throw e;
    }
  };
};

export const loadCurrentUser = () => {
  return async (dispatch, getState, services) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'comments/set-current-user', payload: null });
        return;
      }

      const res = await services.api.request({
        url: '/api/v1/users/self',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: 'comments/set-current-user',
        payload: res.data.result?._id || null
      });
    } catch (error) {
      console.error('Failed to load current user:', error);
      dispatch({
        type: 'comments/set-current-user',
        payload: null
      });
    }
  };
};
