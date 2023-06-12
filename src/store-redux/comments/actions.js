export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего комментариев и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});

        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });

          dispatch({type: 'comments/load-success', payload: res.data.result.items});

        } catch (e) {
          dispatch({type: 'comments/load-error'});
        }
      }
    },
    sendComment: (id, comment) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});

        try {
          const res = await services.api.request({
            url: '/api/v1/comments?fields=*,author(profile(name))',
            method: 'POST',
            body: JSON.stringify({
              "text": comment,
              "parent": {
                "_type": 'article',
                "_id": id
              }
            })
          });
          dispatch({type: 'comments/send', payload: res})
        } catch (e) {
          dispatch({type: 'comments/load-error'});
        }
      }
    },
    sendReply: (id, reply) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
        try {
          const res = await services.api.request({
            url: '/api/v1/comments?fields=*,author(profile(name))',
            method: 'POST',
            body: JSON.stringify({
              "text": reply,
              "parent": {
                "_type": "comment",
                "_id": id
              }
            })
          });
          console.log(res);
          dispatch({type: 'comments/reply', payload: res})
        } catch (e) {
          console.log(e);
          dispatch({type: 'comments/load-error'});
        }
      }
    }
}
