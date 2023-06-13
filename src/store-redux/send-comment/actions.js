export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    sendComment: (text, id , type) => {
      return async (dispatch, getState, services) => {
        const token = localStorage.getItem('token');
  
        dispatch({type: 'comments/sendMessage-start'});
        services.api.setHeader(services.config.tokenHeader, token);
  
        if(token) {
          try {
            const res = await services.api.request({
                url: `api/v1/comments`,
                method: 'post',
                body: JSON.stringify({
                  "text": text,
                  "parent": {
                    "_id": id,
                    "_type": type,
                  }
                })
              }
            );
            dispatch({type: 'comments/sendMessage-success', payload: {data: res.data.result}});
    
          } catch (e) {
            //Ошибка загрузки
            dispatch({type: 'comments/sendMessage-error', payload: e?.message});
          }
          
        }
      }
    },
  }