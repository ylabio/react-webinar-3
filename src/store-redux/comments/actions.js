export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
          });
          // Товар загружен успешно
          dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },

    postComment: (text, parentId, type, callback) => {
        return async (dispatch, getState, services) => {
            try {
                dispatch({type: 'comments/post-start'});
                const res = await services.api.request({
                    url: "/api/v1/comments",
                    method: "POST",
                    body: JSON.stringify({
                        text, 
                        parent: {_id: parentId, _type: type}
                    })
                })
                dispatch({type: 'comments/post-success', payload: {id: res.data.result._id}})
                await callback(parentId);
            }
            catch(e) {
                dispatch({type: 'comments/post-error'});
            }
        }
    },
    postAnswer: (text, parentId, type, callback) => {
        return async (dispatch, getState, services) => {
            try {
                dispatch({type: 'comments/post-start'});
                await services.api.request({
                    url: "/api/v1/comments",
                    method: "POST",
                    body: JSON.stringify({
                        text, 
                        parent: {_id: parentId, _type: type}
                    })
                })
                dispatch({type: 'comments/post-reply'});
                await callback();
            }
            catch(e) {
                dispatch({type: 'comments/post-error'});
            }
        }
    },
  }
  