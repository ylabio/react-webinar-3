const actions = {
  /**
   * Загрузка comments
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  createComment: ({ _type, _id, text }) => {
    return async (dispatch, getState, services) => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('токен не обнаружен')
          return;
        }
        const userProfile = await services.store.state.session.user.profile
        
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          contentType: 'application/json',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify({ text: text, parent: { _id: _id, _type: _type } }),
        });
        if(!res.ok) {
            console.log(res.status)
        }
        const commentData = {
          ...res.data.result,
          author: {
            ...res.data.result.author,
            profile: { ...userProfile }
          }
        };
        
        dispatch({
          type: 'comments/create-success',
          payload: { data: commentData }
        });
        //если добавить поле name в profile на бэке, можно сразу обновить тут и убрать обновление комментариев

        /* dispatch(actions.load(_id)); */// либо можно просто обновить список комментариев, но это будет дополнительный запрос

        return commentData;
      } catch (e) {
        console.error(e);
        dispatch({ type: 'comments/create-error', payload: 'Ошибка создания комментария' });
      }
    };
  },
};
export default actions;
