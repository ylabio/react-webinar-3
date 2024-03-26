export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article-comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),
          parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({type: 'article-comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comments/load-error'});
      }
    }
  },
  addComment: (data, currentUserName) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: 'api/v1/comments',
          method: 'POST',
          body: JSON.stringify(data)
        })

        const resultedComment = {
          ...res.data.result,
          author: {
            ...res.data.result.author, 
            profile: {
              name: currentUserName
            }
          }
        }
        dispatch({type: 'article-comments/addComment', payload: {
          newComment: resultedComment
        }})
      } catch(e) {
        console.error(e)
      }
    }
  }
}
