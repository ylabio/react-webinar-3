export default {
  /**
   * Загрузка комментариев
   * @param id (товара)
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
        // console.log("res:", res);

      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Добавление нового комментария в лист комментариев
   * @return {Function}
   */
  pushComment: () => { 
   
    return (dispatch, getState, services) => {

      const newComment = getState().commentsForm.newComment;
      const nameUser = services._store.state.session.user.profile.name;
      newComment.author.profile = {...newComment.author.profile, name: nameUser};

      dispatch({type: 'comments/push-new-comment', payload: {newComment: newComment}});
    }
  },

}