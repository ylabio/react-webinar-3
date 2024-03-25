export default {
  /**
   * Загрузка комментов
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const params = `fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`

        const { data } = await services.api.request({url: `api/v1/comments?${params}`});

        dispatch({ type: 'comments/load-success', payload: { data: data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  selectComment: (id) => {
    return (dispatch) => {
      dispatch({type: 'comments/selectComment', payload: id})
    }
  },

  unselectComment: () => {
    return (dispatch) => {
      dispatch({type: 'comments/unselectComment'})
    }
  },

  addComment: (body) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-start'});
      try {
          const {data} = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: JSON.stringify(body)
          });
          const userName = services._store.state.session.user.profile.name;
          const updatedComment = {
            ...data.result,
            author: {
              ...data.result.author,
              profile: {name: userName}
            }
          };

          dispatch({type: "comments/add-success", payload: {newComment: updatedComment}});
          dispatch({type: 'comments/unselectComment'})
      } catch (error) {
          console.log(error)
          dispatch({ type: "comments/add-error" });
      }
    }
  }
}
