export default {
  /**
   * Загрузка комментариев к товару
   * @param id
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
      } catch {
        // Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          method: 'POST',
          url: '/api/v1/comments',
          body: JSON.stringify(data)
        });

        try {
          const resData = await services.api.request({
            url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${getState().article.data._id}`,
          });
          dispatch({type: 'one-comment/load-success', payload: {data: resData.data.result}});
        } catch (e) {
          dispatch({type: 'comments/send-error'});
        }


        if (res.status === 200) {
          const resData = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          dispatch({type: 'one-comment/load-success', payload: {data: resData.data.result}});
        } else {
          console.log(res.status)
        }

      } catch {
        // Ошибка загрузки
        dispatch({type: 'comments/send-error'});
      }
    }
  }


}